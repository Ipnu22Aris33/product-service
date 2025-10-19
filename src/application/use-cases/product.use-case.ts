import { ParamUidDTO } from '@application/dtos/param-dtos/param-uid.dto';
import { CreateProductUseCaseDTO } from '@application/dtos/use-case-dtos/create-product.dto';
import { CategoryService } from '@application/services/category.service';
import { ProductCategoryService } from '@application/services/product-category.service';
import { ProductService } from '@application/services/product.service';
import { ProductCategoryFactory } from '@domain/factories/product-category.factory';
import { ProductFactory } from '@domain/factories/product.factory';
import {
  DescriptionVO,
  NameVO,
  PriceVO,
  StockVO,
  UidVO,
} from '@domain/value-objects';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductUseCase {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly productCategoryService: ProductCategoryService,
  ) {}

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

  async getProductByUid(dto: ParamUidDTO) {
    const product = await this.productService.findByUid(dto.uid);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async getAllProducts() {
    const products = await this.productService.findAll();
    return products ?? [];
  }

  async addProductCategory(dto: { productUid: string; categoryUid: string[] }) {
    const [product, categories] = await Promise.all([
      this.productService.findByUid(dto.productUid),
      this.categoryService.findManyByUid(dto.categoryUid),
    ]);

    if (!product) throw new Error('Product not found');
    if (!categories.length) throw new Error('No valid categories found');

    const validCategories = categories.filter((c) => !!c);

    const productCategoryEntities = validCategories.map((category) =>
      new ProductCategoryFactory().createNew({
        props: {
          productUid: UidVO.create(product.getUidValue()),
          categoryUid: UidVO.create(category.getUidValue()),
        },
      }),
    );

    await this.productCategoryService.bulkCreate(productCategoryEntities);

    return {
      product: product.getUidValue(),
      linkedCategories: productCategoryEntities.map((c) => c.getCategoryUidValue()),
    };
  }
}
