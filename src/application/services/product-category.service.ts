import {
  PRODUCT_CATEGORY_OUT_PORT,
  type ProductCategoryOutPort,
} from '@application/ports/out/product-category.out-port';
import { ProductCategoryEntity } from '@domain/entities/product-category.entity';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProductCategoryService {
  constructor(
    @Inject(PRODUCT_CATEGORY_OUT_PORT)
    private readonly productCategoryPort: ProductCategoryOutPort,
  ) {}

  async bulkSave(entities: ProductCategoryEntity[]): Promise<void> {
    if (!entities.length) return;
    await this.productCategoryPort.bulkSave(entities);
  }

  async findByProductUid(productUid: string): Promise<ProductCategoryEntity[]> {
    return await this.productCategoryPort.findByProductUid(productUid);
  }
}
