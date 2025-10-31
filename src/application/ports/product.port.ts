import { ProductEntity } from '@domain/entities/product.entity';
import {
  CreateProductInput,
  GetProductByUidInput,
  AddProductCategoriesInput,
} from '@application/types/input/product-input.type';
import {
  CreateProductOutput,
  GetProductByUidOutput,
  AddProductCategoriesOutput,
} from '@application/types/output/product-output.type';

// Symbols untuk dependency injection
export const PRODUCT_IN_PORT = Symbol('PRODUCT_IN_PORT');
export const PRODUCT_OUT_PORT = Symbol('PRODUCT_OUT_PORT');

// Inbound Port (use case)
export interface ProductInPort {
  createProduct(input: CreateProductInput): Promise<CreateProductOutput>;
  getProductByUid(input: GetProductByUidInput): Promise<GetProductByUidOutput | null>;
  getAllProducts(): Promise<ProductEntity[]>;
  addProductCategories(input: AddProductCategoriesInput): Promise<AddProductCategoriesOutput>;
}

// Outbound Port (repository / adapter)
export interface ProductOutPort {
  save(product: ProductEntity): Promise<void>;
  findByUid(uid: string): Promise<ProductEntity | null>;
  findAll(): Promise<ProductEntity[]>;
}
