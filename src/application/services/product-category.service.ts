import {
  PRODUCT_CATEGORY_PORT,
  type ProductCategoryPort,
} from '@application/ports/out/product-category.out-port';
import { ProductCategoryEntity } from '@domain/entities/product-category.entity';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProductCategoryService {
  constructor(
    @Inject(PRODUCT_CATEGORY_PORT)
    private readonly productCategoryPort: ProductCategoryPort,
  ) {}

  async save(entity: ProductCategoryEntity): Promise<void> {
    await this.productCategoryPort.save(entity);
  }
}
