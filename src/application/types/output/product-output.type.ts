import { CategoryEntity } from '@domain/entities/category.entity';
import { ProductCategoryEntity } from '@domain/entities/product-category.entity';
import { ProductEntity } from '@domain/entities/product.entity';

export type AddProductCategoriesOutput = {
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

export type CreateProductOutput = {
  product: ProductEntity;
  message: string;
};

export type GetProductByUidOutput = {
  product: ProductEntity;
  productCategories: ProductCategoryEntity[];
  categoryDetails: CategoryEntity[];
  message: string;
};
