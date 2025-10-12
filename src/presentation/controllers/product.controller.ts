import { FindProductByUidUseCase } from '@application/use-cases/product-use-cases';
import { AddProductCategoriesUseCase } from '@application/use-cases/product-use-cases/add-product-categories.use-case';
import { CreateProductUseCase } from '@application/use-cases/product-use-cases/create-product.use-case';
import { FindAllProductUseCase } from '@application/use-cases/product-use-cases/find-all-product.use-case';
import { RemoveProductCategoriesUseCase } from '@application/use-cases/product-use-cases/remove-product-categories.use-case';
import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ProductResponseMapper } from '@presentation/mappers/product-response.mapper';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProduct: CreateProductUseCase,
    private readonly findAllProduct: FindAllProductUseCase,
    private readonly addProductCategories: AddProductCategoriesUseCase,
    private readonly findProductByUid: FindProductByUidUseCase,
    private readonly removeProductCategories: RemoveProductCategoriesUseCase
  ) {}

  @Post('create')
  async create(
    @Body()
    dto: {
      name: string;
      price: number;
      stock: number;
      description: string;
    },
  ) {
    const doc = await this.createProduct.execute(dto);
    return ProductResponseMapper.toCreate(doc);
  }

  @Get(':productUid')
  async findByUid(@Param() dto: { productUid: string }) {
    const doc = await this.findProductByUid.execute(dto);
    return ProductResponseMapper.toFindByUid(doc);
  }

  @Get()
  async findAll() {
    const doc = await this.findAllProduct.execute();
    return ProductResponseMapper.toFindAll(doc);
  }

  @Post(':productUid/categories/add')
  async addCategory(
    @Param() param: { productUid: string },
    @Body() body: { categoryUids: string[] },
  ) {
    const doc = await this.addProductCategories.execute({
      productUid: param.productUid,
      categoryUids: body.categoryUids,
    });
    if (!doc) {
      throw new NotFoundException('Product not found');
    }
    return ProductResponseMapper.toAddCategory(doc);
  }

  @Post(':productUid/categories/remove')
  async removeCategory(
    @Param() param: { productUid: string },
    @Body() body: { categoryUids: string[] },
  ) {
    const doc = await this.removeProductCategories.execute({
      productUid: param.productUid,
      categoryUids: body.categoryUids,
    });
    if (!doc) {
      throw new NotFoundException('Product not found');
    }
    return ProductResponseMapper.toAddCategory(doc);
  }
}
