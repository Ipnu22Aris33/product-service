import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductPort } from '@application/ports/out/product.out-port';
import { ProductEntity } from '@domain/entities/product.entity';
import {
  Product,
  ProductDocument,
} from '@infrastructure/persistence/databases/mongoose/schemas/product.schema';
import {
  ProductCategory,
  ProductCategoryDocument,
} from '@infrastructure/persistence/databases/mongoose/schemas/product-category.schema';
import { ProductMapper } from '@infrastructure/persistence/mappers/product.mapper';
import { ProductCategoryMapper } from '@infrastructure/persistence/mappers/product-category.mapper';
import { ProductCategoryEntity } from '@domain/entities/product-category.entity';

@Injectable()
export class ProductRepository implements ProductPort {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  // --------------------------------------------------
  // 🔹 PUBLIC METHODS (sesuai kontrak port)
  // --------------------------------------------------

  async save(product: ProductEntity): Promise<void> {
    await this.saveProduct(product);
  }

  async findAll(): Promise<ProductEntity[]> {
    const productDocs = await this.productModel.find().exec();
    return ProductMapper.fromPersistenceArray(productDocs);
  }

  async findByUid(uid: string): Promise<ProductEntity | null> {
    if (!uid) return null;

    const product = await this.productModel.findOne({ uid });
    if (!product) return null;

    return ProductMapper.fromPersistence(product)
  }

  // --------------------------------------------------
  // 🔸 PRIVATE HELPERS (detail implementasi)
  // --------------------------------------------------

  /** Simpan data produk utama */
  private async saveProduct(product: ProductEntity): Promise<void> {
    const doc = ProductMapper.toPersistence(product);
    await this.productModel.findOneAndUpdate({ uid: doc.uid }, doc, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  }

  /** Simpan kategori produk (jika ada) */

  /** Ambil product dari persistence */
  private async findProduct(uid: string): Promise<ProductEntity | null> {
    if (!uid) return null; // ✅ validasi tambahan (opsional)
    const doc = await this.productModel.findOne({ uid }).exec();
    return doc ? ProductMapper.fromPersistence(doc) : null;
  }
}
