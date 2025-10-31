import { ProductCategoryEntity } from '@domain/entities/product-category.entity';
import { AssignCategoriesToProductInput } from '@application/types/input/product-category-input.type';
import { AssignCategoriesToProductOutput } from '@application/types/output/product-category-output.type';

export const PRODUCT_CATEGORY_IN_PORT = Symbol('PRODUCT_CATEGORY_IN_PORT');
export const PRODUCT_CATEGORY_OUT_PORT = Symbol('PRODUCT_CATEGORY_OUT_PORT');

export interface ProductCategoryInPort {
  assignCategoriesToProduct(dto: AssignCategoriesToProductInput): Promise<AssignCategoriesToProductOutput>;
}

export interface ProductCategoryOutPort {
  bulkSave(entities: ProductCategoryEntity[]): Promise<void>;
  findByProductUid(uid: string): Promise<ProductCategoryEntity[]>;
}
