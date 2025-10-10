import { Module } from '@nestjs/common';
import { PRODUCT_PORT } from '@application/ports/product.port';
import { DatabaseModule } from '@infrastructure/persistence/databases/database.module';
import { ProductRepository } from '@infrastructure/persistence/databases/repositories/product.repository';
import { ProductController } from '@presentation/controllers/product.controller';
import { ProductService } from '@application/services/product.service';
import {
  AddProductCategoriesUseCase,
  CreateProductUseCase,
  FindAllProductUseCase,
  FindProductByUidUseCase,
} from '@application/use-cases/product';
import { CategoryModule } from './category.module';
import { RemoveProductCategoriesUseCase } from '@application/use-cases/product/remove-product-categories.use-case';

@Module({
  imports: [DatabaseModule, CategoryModule],
  controllers: [ProductController],
  providers: [
    {
      provide: PRODUCT_PORT,
      useClass: ProductRepository,
    },
    ProductService,
    CreateProductUseCase,
    FindAllProductUseCase,
    AddProductCategoriesUseCase,
    FindProductByUidUseCase,
    RemoveProductCategoriesUseCase
  ],
  exports: [ProductService],
})
export class ProductModule {}
