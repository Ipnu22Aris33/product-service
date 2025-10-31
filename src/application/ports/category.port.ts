import { CategoryEntity } from '@domain/entities/category.entity';
import { CreateCategoryOutput } from '@application/types/output/category-output.type';
import { CreateCategoryInput, GetCategoryByUidInput } from '@application/types/input/category-input.type';

export const CATEGORY_IN_PORT = Symbol('CATEGORY_IN_PORT');
export const CATEGORY_OUT_PORT = Symbol('CATEGORY_OUT_PORT');

export interface CategoryInPort {
  createCategory(dto: CreateCategoryInput): Promise<CreateCategoryOutput>;
  getCategoryByUid(dto: GetCategoryByUidInput): Promise<CategoryEntity | null>;
  getAllCategories(): Promise<CategoryEntity[]>;
}

export interface CategoryOutPort {
  save(category: CategoryEntity): Promise<void>;
  findByUid(uid: string): Promise<CategoryEntity | null>;
  findAll(): Promise<CategoryEntity[]>;
  findManyByUid(uids: string[]): Promise<CategoryEntity[]>;
}
