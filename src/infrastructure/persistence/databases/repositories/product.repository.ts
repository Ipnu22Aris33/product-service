import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductPort } from '@application/ports/product.port';
import { ProductEntity } from '@domain/entities/product.entity';
import { ProductCategoryEntity } from '@domain/entities/product-category.entity';

import { Product, ProductDocument } from '@infrastructure/persistence/databases/schemas/product.schema';
import { ProductCategory, ProductCategoryDocument } from '@infrastructure/persistence/databases/schemas/product-category.schema';

import { ProductMapper } from '@infrastructure/persistence/mappers/product.mapper';
import { ProductCategoryMapper } from '@infrastructure/persistence/mappers/product-category.mapper';

@Injectable()
export class ProductRepository implements ProductPort {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
    @InjectModel(ProductCategory.name) private readonly productCategoryModel: Model<ProductCategoryDocument>,
  ) {}

  async save(product: ProductEntity): Promise<ProductEntity> {
    await this.saveProduct(product);
    await this.saveProductCategories(product);
    return product; // entity sudah update dengan kategori terbaru
  }

  async findAll(): Promise<ProductEntity[]> {
    const doc = await this.productModel.find().exec();
    return ProductMapper.fromPersistenceArray(doc);
  }

  async findByUid(uid: string | null): Promise<ProductEntity | null> {
    const doc = await this.productModel.findOne({ uid }).exec();
    if (!doc) return null;

    const product = ProductMapper.fromPersistence(doc);

    const categoryDocs = await this.productCategoryModel
      .find({ productUid: product.getUidValue() })
      .sort({ createdAt: -1 })
      .exec();

    const categories = ProductCategoryMapper.fromPersistenceArray(categoryDocs);
    product.setProductCategories(categories); // touch aman

    return product;
  }

  private async saveProduct(product: ProductEntity): Promise<void> {
    const persistence = ProductMapper.toPersistence(product);
    await this.productModel.findOneAndUpdate(
      { uid: persistence.uid },
      persistence,
      { new: true, upsert: true },
    ).exec();
  }

  private async saveProductCategories(product: ProductEntity): Promise<void> {
    const categories = product.getProductCategories();
    if (categories.length === 0) return;

    const persistenceCategories = categories.map(c => ({
      ...ProductCategoryMapper.toPersistence(c),
      productUid: product.getUidValue(),
    }));

    await this.productCategoryModel.bulkWrite(
      persistenceCategories.map(cat => ({
        updateOne: {
          filter: { uid: cat.uid },
          update: { $set: cat },
          upsert: true,
        },
      })),
    );

    // Ambil kembali dari DB agar entity sinkron
    const savedDocs = await this.productCategoryModel
      .find({ uid: { $in: persistenceCategories.map(c => c.uid) } })
      .exec();

    const savedCategories = ProductCategoryMapper.fromPersistenceArray(savedDocs);
    product.setProductCategories(savedCategories); // touch aman
  }
}

