import { ProductPort } from '@application/ports/product.port';
import { ProductEntity } from '@domain/entities/product.entity';
import {
  ProductDocument,
  Product,
} from '@infrastructure/databases/schemas/product.schema';
import { ProductMapper } from '@infrastructure/mappers/product.mapper';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductRepository implements ProductPort {
  constructor(
    @InjectModel(Product.name) private readonly model: Model<ProductDocument>,
  ) {}

  async save(product: ProductEntity): Promise<ProductEntity> {
    const persistance = ProductMapper.toPersistence(product);
    const filter = { uid: persistance.uid };
    const options = { new: true, upsert: true };
    return this.model
      .findOneAndUpdate(filter, persistance, options)
      .then((doc) => {
        if (doc) return ProductMapper.fromPersistence(doc);
        throw new InternalServerErrorException('Failed to upsert category');
      });
  }

  async findByUid(uid: string | null): Promise<ProductEntity | null> {
    const doc = await this.model.findOne({ uid });
    return doc ? ProductMapper.fromPersistence(doc) : null;
  }

  async findAll(): Promise<ProductEntity[]> {
    const docs = await this.model.find().exec();
    return docs.map((doc) => ProductMapper.fromPersistence(doc));
  }

  async findByUids(uids: string[]): Promise<ProductEntity[]> {
    if (!uids.length) return []; // jaga kalau array kosong
    const docs = await this.model.find({ uid: { $in: uids } });
    return docs.map((doc) => ProductMapper.fromPersistence(doc));
  }
}
