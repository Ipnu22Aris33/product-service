import { CreateCategoryDTO } from '@application/dtos/category-dtos/create-category.dto';
import { ParamUidDTO } from '@application/dtos/param-dtos/param-uid.dto';
import { CreateCategoryUseCaseDTO } from '@application/dtos/use-case-dtos/create-category.dto';
import { CategoryEntity } from '@domain/entities/category.entity';

export const CATEGORY_IN_PORT = Symbol('CATEGORY_IN_PORT');

export interface CategoryInPort {
  createCategory(dto: CreateCategoryDTO): Promise<CategoryEntity>;
  getCategoryByUid(dto: ParamUidDTO): Promise<CategoryEntity | null>;
  getAllCategories(): Promise<CategoryEntity[]>;
}
