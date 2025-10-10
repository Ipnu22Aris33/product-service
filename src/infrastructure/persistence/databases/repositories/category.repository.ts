import { CategoryPort } from '@application/ports/category.port';
import { CategoryEntity } from '@domain/entities/category.entity';
import {
  Category,
  CategoryDocument,
} from '@infrastructure/persistence/databases/schemas/category.schema';
import { CategoryMapper } from '@infrastructure/persistence/mappers/category.mapper';
import { InternalServerErrorException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoryRepository implements CategoryPort {
  constructor(
    @InjectModel(Category.name)
    private readonly model: Model<CategoryDocument>,
  ) {}

  async save(category: CategoryEntity): Promise<CategoryEntity> {
    const persistance = CategoryMapper.toPersistence(category);
    const filter = { uid: persistance.uid };
    const options = { new: true, upsert: true };
    return this.model
      .findOneAndUpdate(filter, persistance, options)
      .then((doc) => {
        if (doc) return CategoryMapper.fromPersistence(doc);
        throw new InternalServerErrorException('Failed to upsert category');
      });
  }

  async findByUid(uid: string | null): Promise<CategoryEntity | null> {
    const doc = await this.model.findOne({ uid });
    if (!doc) return null;
    return CategoryMapper.fromPersistence(doc);
  }

  async findAll(): Promise<CategoryEntity[]> {
    const doc = await this.model.find()
    return CategoryMapper.fromPersistenceArray(doc)
  }
}
