import { ProductEntity } from '@domain/entities/product.entity';

export interface ProductPort {
  save(product: ProductEntity): Promise<ProductEntity>;
  findByUid(uid: string | null): Promise<ProductEntity | null>;
  findAll(): Promise<ProductEntity[]>;
  findByUids(uids: string[]): Promise<ProductEntity[]>;
}
