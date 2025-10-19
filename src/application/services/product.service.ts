import {
  PRODUCT_PORT,
  type ProductPort,
} from '@application/ports/out/product.out-port';
import { ProductEntity } from '@domain/entities/product.entity';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_PORT) private readonly productPort: ProductPort,
  ) {}

  async save(entity: ProductEntity): Promise<void> {
    await this.productPort.save(entity);
  }

  async findByUid(uid: string): Promise<ProductEntity | null> {
    return await this.productPort.findByUid(uid);
  }

  async findAll(): Promise<ProductEntity[]> {
    return await this.productPort.findAll();
  }
}
