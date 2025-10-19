import { ProductCategoryEntity } from '@domain/entities/product-category.entity';

export const PRODUCT_CATEGORY_PORT = Symbol('PRODUCT_CATEGORY_PORT');

export interface ProductCategoryPort {
  save(prop: ProductCategoryEntity): Promise<void>;
  findByUid(uid: string): Promise<ProductCategoryEntity | null>;
}
