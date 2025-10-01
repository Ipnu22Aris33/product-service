import { ProductService } from '@application/services/product.service';
import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { ProductResponseMapper } from '@presentation/mappers/product-response.mapper';

@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

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
    const doc = await this.service.create(dto);
    return ProductResponseMapper.toCreate(doc);
  }

  @Get(':uid')
  async findByUid(@Param() dto: { uid: string }) {
    const doc = await this.service.findByUid(dto);
    return ProductResponseMapper.toFindByUid(doc);
  }

  @Get()
  async findAll() {
    const doc = await this.service.findAll();
    return ProductResponseMapper.toFindAll(doc);
  }

  @Post('batch')
  async findUids(@Body() dto: { uids: string[] }) {
    return await this.service.findByUids(dto);
  }
}
