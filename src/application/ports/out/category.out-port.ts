import { CategoryEntity } from '@domain/entities/category.entity';

export const CATEGORY_OUT_PORT = Symbol('CATEGORY_OUT_PORT');

export interface CategoryOutPort {
  save(category: CategoryEntity): Promise<void>;
  findByUid(uid: string): Promise<CategoryEntity | null>;
  findAll(): Promise<CategoryEntity[]>;
}
