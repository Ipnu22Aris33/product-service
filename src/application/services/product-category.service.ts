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

  async bulkCreate(entities: ProductCategoryEntity[]): Promise<void> {
    if (!entities.length) return;
    await this.productCategoryPort.bulkCreate(entities);
  }

  async findByProductUid(productUid: string): Promise<ProductCategoryEntity[]> {
    return await this.productCategoryPort.findByProductUid(productUid);
  }
}
