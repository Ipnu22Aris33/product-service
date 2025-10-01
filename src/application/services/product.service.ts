import { CreateProductUseCase } from '@application/use-cases/product/create-product.use-case';
import { FindAllProductUseCase } from '@application/use-cases/product/find-all-product.use-case';
import { FindProductByUidUseCase } from '@application/use-cases/product/find-product-by-uid.use-case';
import { FindProductByUidsUseCase } from '@application/use-cases/product/find-product-by-uids.use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findProductByUidUseCase: FindProductByUidUseCase,
    private readonly findAllProductUseCase: FindAllProductUseCase,
    private readonly findProductByUidsUseCase: FindProductByUidsUseCase,
  ) {}

  async create(dto: {
    name: string;
    price: number;
    stock: number;
    description: string | null;
  }) {
    return await this.createProductUseCase.execute(dto);
  }

  async findByUid(dto: { uid: string }) {
    return await this.findProductByUidUseCase.execute({ uid: dto.uid });
  }

  async findAll() {
    return await this.findAllProductUseCase.execute();
  }

  async findByUids(dto: { uids: string[] }) {
    return await this.findProductByUidsUseCase.execute({ uids: dto.uids });
  }
}
