import type { ProductPort } from '@application/ports/product.port';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindAllProductUseCase {
  constructor(
    @Inject('ProductPort') private readonly port: ProductPort,
  ) {}

  async execute() {
    const doc = await this.port.findAll();
    return doc;
  }
}
