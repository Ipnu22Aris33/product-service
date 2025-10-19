import {
  PRODUCT_IN_PORT,
  type ProductInPort,
} from '@application/ports/in/product.in-port';
import { ProductUseCase } from '@application/use-cases/product.use-case';
import { ProductMapper } from '@infrastructure/persistence/mappers/product.mapper';
import { Body, Controller, Get, Post, Param, Inject } from '@nestjs/common';
import { ProductRequestMapper } from '@presentation/mappers/request-mappers/product.request-mapper';
import { ProductResponseMapper } from '@presentation/mappers/response-mappers/product.response-mapper';

@Controller('products')
export class ProductController {
  constructor(
    @Inject(PRODUCT_IN_PORT) private readonly productInPort: ProductInPort,
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
    const doc = await this.productInPort.createProduct(dto);
    return ProductResponseMapper.toCreate(doc);
  }

  @Get(':uid')
  async findByUid(@Param() param: { uid: string }) {
    const doc = await this.productInPort.getProductByUid({ uid: param.uid });
    return ProductResponseMapper.toFindByUid(doc);
  }

  @Get()
  async findAll() {
    const doc = await this.productInPort.getAllProducts();
    return ProductResponseMapper.toFindAll(doc);
  }

  @Post(':uid/categories/add')
  async addProductCategory(
    @Param() param: { uid: string },
    @Body() body: { categoryUids: string[] },
  ) {
    const dto = ProductRequestMapper.toAddCategories({ param, body });
    const result = await this.productInPort.addProductCategories(dto);
    return ProductResponseMapper.toAddCategory(result);
  }
}
