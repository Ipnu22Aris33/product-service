import { CreateCategoryUseCaseDTO } from '@application/dtos/use-case-dtos/create-category.dto';
import { CategoryEntity } from '@domain/entities/category.entity';

export const CATEGORY_IN_PORT = Symbol('CATEGORY_IN_PORT');

export interface CategoryInPort {
  createCategory(dto: CreateCategoryUseCaseDTO): Promise<CategoryEntity>;
  getCategoryByUid(dto: { uid: string }): Promise<CategoryEntity | null>;
  getAllCategories(): Promise<CategoryEntity[]>;
}
