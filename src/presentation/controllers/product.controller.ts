import { ProductUseCase } from '@application/use-cases/product.use-case';
import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { ProductResponseMapper } from '@presentation/mappers/product-response.mapper';

@Controller('products')
export class ProductController {
  constructor(private readonly productUseCase: ProductUseCase) {}

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
    const doc = await this.productUseCase.createProduct(dto);
    return ProductResponseMapper.toCreate(doc);
  }

  @Get(':uid')
  async findByUid(@Param() param: { uid: string }) {
    const doc = await this.productUseCase.getProductByUid({ uid: param.uid });
    return ProductResponseMapper.toFindByUid(doc);
  }

  @Get()
  async findAll() {
    const doc = await this.productUseCase.getAllProducts();
    return ProductResponseMapper.toFindAll(doc);
  }

  // @Post(':productUid/categories/add')
  // async addCategory(
  //   @Param() param: { productUid: string },
  //   @Body() body: { categoryUids: string[] },
  // ) {
  //   console.log(param.productUid);
  //   const doc = await this.addProductCategories.execute({
  //     productUid: param.productUid,
  //     categoryUids: body.categoryUids,
  //   });
  //   console.log(doc);
  //   return ProductResponseMapper.toAddCategory(doc);
  // }

  // @Post(':productUid/categories/remove')
  // async removeCategory(
  //   @Param() param: { productUid: string },
  //   @Body() body: { categoryUids: string[] },
  // ) {
  //   const doc = await this.removeProductCategories.execute({
  //     productUid: param.productUid,
  //     categoryUids: body.categoryUids,
  //   });
  //   if (!doc) {
  //     throw new NotFoundException('Product not found');
  //   }
  //   return ProductResponseMapper.toAddCategory(doc);
  // }
}
