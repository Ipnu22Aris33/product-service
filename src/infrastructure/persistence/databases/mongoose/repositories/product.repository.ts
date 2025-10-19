import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductPort } from '@application/ports/out/product.out-port';
import { ProductEntity } from '@domain/entities/product.entity';
import {
  Product,
  ProductDocument,
} from '@infrastructure/persistence/databases/mongoose/schemas/product.schema';
import { ProductMapper } from '@infrastructure/persistence/mappers/product.mapper';

@Injectable()
export class ProductRepository implements ProductPort {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}


  async save(product: ProductEntity): Promise<void> {
    const persistence = ProductMapper.toPersistence(product);
    const filter = { uid: persistence.uid };
    await this.productModel.findOneAndUpdate(filter, persistence, {
      upsert: true,
      new: true,
    });
  }

  async findAll(): Promise<ProductEntity[]> {
    const productDocs = await this.productModel.find().exec();
    return ProductMapper.fromPersistenceArray(productDocs);
  }

  async findByUid(uid: string): Promise<ProductEntity | null> {
    if (!uid) return null;

    const product = await this.productModel.findOne({ uid });
    if (!product) return null;

    return ProductMapper.fromPersistence(product);
  }
}
