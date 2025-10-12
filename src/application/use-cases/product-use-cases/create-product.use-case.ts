import { CreateProductUseCaseDTO } from '@application/dtos/use-case-dtos/create-product.dto';
import { ProductService } from '@application/services/product.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productService: ProductService) {}

  async execute(dto: CreateProductUseCaseDTO) {
    return this.productService.createProduct(dto);
  }
}
