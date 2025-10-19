import { ParamUidDTO } from '@application/dtos/param-dtos/param-uid.dto';
import { AddProductCategoriesDTO } from '@application/dtos/use-case-dtos/add-product-categories.dto';
import { CreateProductUseCaseDTO } from '@application/dtos/use-case-dtos/create-product.dto';
import { AddProductCategoriesResult } from '@application/types/product-use-case.type';
import { CategoryEntity } from '@domain/entities/category.entity';
import { ProductCategoryEntity } from '@domain/entities/product-category.entity';
import { ProductEntity } from '@domain/entities/product.entity';

export const PRODUCT_IN_PORT = Symbol('PRODUCT_IN_PORT');


export interface ProductInPort {
  createProduct(dto: CreateProductUseCaseDTO): Promise<ProductEntity>;
  getProductByUid(dto: ParamUidDTO): Promise<ProductEntity | null>;
  getAllProducts(): Promise<ProductEntity[]>;
  addProductCategories(
    dto: AddProductCategoriesDTO,
  ): Promise<AddProductCategoriesResult>;
}
