import { ICategoryRepository } from '@application/ports/category-repository.port';
import { CategoryEntity } from '@domain/entities/category.entity';
import {
  Category,
  CategoryDocument,
} from '@infrastructure/databases/schemas/category.schema';
import { CategoryMapper } from '@infrastructure/mappers/category.mapper';
import { InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectModel(Category.name) private readonly model: Model<CategoryDocument>,
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
}
