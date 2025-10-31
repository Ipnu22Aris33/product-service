import { CategoryEntity } from '@domain/entities/category.entity';

export type CreateCategoryOutput = {
  category: CategoryEntity;
  message: string;
};
export type GetCategoryByUidOutput = { uid: string };
