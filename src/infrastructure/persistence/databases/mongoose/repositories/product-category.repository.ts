import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ProductCategory,
  ProductCategoryDocument,
} from '../schemas/product-category.schema';
import { Model } from 'mongoose';
import { ProductCategoryOutPort } from '@application/ports/out/product-category.out-port';
import { ProductCategoryEntity } from '@domain/entities/product-category.entity';
import { ProductCategoryMapper } from '@infrastructure/persistence/mappers/product-category.mapper';

@Injectable()
export class ProductCategoryRepository implements ProductCategoryOutPort {
  constructor(
    @InjectModel(ProductCategory.name)
    private readonly model: Model<ProductCategoryDocument>,
  ) {}

  async bulkCreate(entities: ProductCategoryEntity[]): Promise<void> {
    if (!entities.length) return;
    const persistance = ProductCategoryMapper.toPersistenceArray(entities);
    await this.model.insertMany(persistance, { ordered: false });
  }

  async findByProductUid(uid: string): Promise<ProductCategoryEntity[]> {
    const docs = await this.model.find({ productUid: uid }).lean();
    return ProductCategoryMapper.fromPersistenceArray(docs);
  }
}
