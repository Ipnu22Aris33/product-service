import { CreateProductUseCaseDTO } from '@application/dtos/use-case-dtos/create-product.dto';
import { ProductService } from '@application/services/product.service';
import { ProductFactory } from '@domain/factories/product.factory';
import { DescriptionVO, NameVO, PriceVO, StockVO } from '@domain/value-objects';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductUseCase {
  constructor(private readonly productService: ProductService) {}

  async createProduct(dto: CreateProductUseCaseDTO) {
    const nameVO = NameVO.create(dto.name);
    const priceVO = PriceVO.create(dto.price);
    const stockVO = StockVO.create(dto.stock);
    const descriptionVO = DescriptionVO.create(dto.description);

    const product = new ProductFactory().createNew({
      props: {
        name: nameVO,
        price: priceVO,
        stock: stockVO,
        description: descriptionVO,
      },
    });

    await this.productService.save(product);
    return product;
  }

  async getProductByUid(dto: { uid: string }) {
    const product = await this.productService.findByUid({
      productUid: dto.uid,
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async getAllProducts() {
    const products = await this.productService.findAll();
    return products ?? [];
  }
}
