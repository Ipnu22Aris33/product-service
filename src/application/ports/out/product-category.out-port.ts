import { ProductCategoryEntity } from '@domain/entities/product-category.entity';

export const PRODUCT_CATEGORY_OUT_PORT = Symbol('PRODUCT_CATEGORY_OUT_PORT');

export interface ProductCategoryOutPort {
  bulkCreate(entities: ProductCategoryEntity[]): Promise<void>;
  findByProductUid(uid: string): Promise<ProductCategoryEntity[]>;
}
