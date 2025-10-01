import { CategoryEntity } from '@domain/entities/category.entity';

export interface CategoryPort {
  save(category: CategoryEntity): Promise<CategoryEntity>;
}
