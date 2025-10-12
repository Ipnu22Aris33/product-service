import { ProductService } from '@application/services/product.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllProductUseCase {
  constructor(private readonly productService: ProductService) {}

  async execute() {
    return await this.productService.findAllProduct();
  }
}
