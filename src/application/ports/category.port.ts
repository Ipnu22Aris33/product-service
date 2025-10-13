import { CategoryEntity } from '@domain/entities/category.entity';

export const CATEGORY_PORT = Symbol('CATEGORY_PORT');

export interface CategoryPort {
  save(category: CategoryEntity): Promise<CategoryEntity>;
  findByUid(uid: string): Promise<CategoryEntity | null>;
  findAll(): Promise<CategoryEntity[]>;
}
