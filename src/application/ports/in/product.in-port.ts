import { CreateProductUseCaseDTO } from '@application/dtos/use-case-dtos/create-product.dto';
import { ProductEntity } from '@domain/entities/product.entity';

export const PRODUCT_IN_PORT = Symbol('PRODUCT_IN_PORT');

export interface ProductInPort {
  createProduct(dto: CreateProductUseCaseDTO): Promise<ProductEntity>;
}
