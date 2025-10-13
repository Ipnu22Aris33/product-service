import type { ProductPort } from '@application/ports/product.port';
import { ProductService } from '@application/services/product.service';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FindProductByUidUseCase {
  constructor(private readonly productService: ProductService) {}

  async execute(dto: { productUid: string }) {
    const doc = await this.productService.findProductByUid(dto);
    if (!doc) throw new NotFoundException('Product Not Found');
    console.log(doc)
    return doc;
  }
}
