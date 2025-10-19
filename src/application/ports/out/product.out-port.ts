import { ProductEntity } from '@domain/entities/product.entity';

export const PRODUCT_PORT = Symbol('PRODUCT_PORT');

export interface ProductPort {
  save(product: ProductEntity): Promise<void>;
  findByUid(uid: string): Promise<ProductEntity | null>;
  findAll(): Promise<ProductEntity[]>;
}
