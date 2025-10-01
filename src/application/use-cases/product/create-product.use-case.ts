import type { ProductPort } from '@application/ports/product.port';
import { Inject, Injectable } from '@nestjs/common';
import { ProductFactory } from '@domain/factores/product.factory';
import { NameVO, PriceVO, StockVO, DescriptionVO } from '@domain/value-object';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('ProductPort') private readonly repo: ProductPort,
  ) {}

  async execute(dto: {
    name: string;
    price: number;
    stock: number;
    description: string | null;
  }) {
    return await this.repo.save(
      ProductFactory.create({
        name: NameVO.create(dto.name),
        price: PriceVO.create(dto.price),
        stock: StockVO.create(dto.stock),
        description: DescriptionVO.create(dto.description),
      }),
    );
  }
}
