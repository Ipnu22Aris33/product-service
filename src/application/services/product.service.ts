import {
  PRODUCT_OUT_PORT,
  type ProductOutPort,
} from '@application/ports/product.port';
import { ProductEntity } from '@domain/entities/product.entity';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_OUT_PORT) private readonly port: ProductOutPort,
  ) {}

  async save(entity: ProductEntity): Promise<void> {
    await this.port.save(entity);
  }
  async create(product: ProductEntity): Promise<void> {
    await this.port.save(product);
  }

  async update(product: ProductEntity): Promise<void> {
    await this.port.save(product);
  }

  // async updateStock(product: ProductEntity, delta: number): Promise<void> {
  //   product.updateStock(delta);
  //   await this.productPort.save(product);
  // }

  // async updateStatus(product: ProductEntity, status: string): Promise<void> {
  //   product.updateStatus(status);
  //   await this.productPort.save(product);
  // }

  async softDelete(product: ProductEntity): Promise<void> {
    product.softDelete();
    await this.port.save(product);
  }

  async findByUid(uid: string): Promise<ProductEntity | null> {
    return await this.port.findByUid(uid);
  }

  async findAll(): Promise<ProductEntity[]> {
    return await this.port.findAll();
  }
}
