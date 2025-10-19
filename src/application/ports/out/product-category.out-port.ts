import { ProductCategoryEntity } from '@domain/entities/product-category.entity';

export const PRODUCT_CATEGORY_PORT = Symbol('PRODUCT_CATEGORY_PORT');

export interface ProductCategoryPort {
 bulkCreate(entities:ProductCategoryEntity[]):Promise<void>
 findByProductUid(uid:string):Promise<ProductCategoryEntity[]>
}
