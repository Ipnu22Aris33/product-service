import { CategoryEntity } from '@domain/entities/category.entity';

export interface ICategoryRepository {
  save(category: CategoryEntity): Promise<CategoryEntity>;
}
