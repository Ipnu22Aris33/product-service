import { ProductUseCase } from '@application/use-cases/product.use-case';
import { ProductMapper } from '@infrastructure/persistence/mappers/product.mapper';
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

  @Post(':uid/categories/add')
  async addProductCategory(
    @Param() param: { uid: string },
    @Body() body: { categoryUids: string[] },
  ) {
    const { product, addedCategories, missingCategoryUids } =
      await this.productUseCase.addProductCategory({
        productUid: param.uid,
        categoryUid: body.categoryUids,
      });
    return ProductResponseMapper.toAddCategory(product, addedCategories, missingCategoryUids);
  }
}
