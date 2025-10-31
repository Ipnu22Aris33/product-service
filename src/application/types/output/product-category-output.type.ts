import { CategoryEntity } from '@domain/entities/category.entity';
import { ProductCategoryEntity } from '@domain/entities/product-category.entity';
import { ProductEntity } from '@domain/entities/product.entity';

export type AssignCategoriesToProductOutput = {
  product: ProductEntity;
  added: {
    categories: ProductCategoryEntity[];
    details: CategoryEntity[];
    count: number;
  };
  notFound: {
    categoryUids: string[];
    count: number;
  };
  message: string;
};
