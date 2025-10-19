import { Module } from '@nestjs/common';
import { PRODUCT_PORT } from '@application/ports/out/product.out-port';
import { DatabaseModule } from '@infrastructure/persistence/databases/database.module';
import { ProductRepository } from '@infrastructure/persistence/databases/mongoose/repositories/product.repository';
import { ProductController } from '@presentation/controllers/product.controller';
import { ProductService } from '@application/services/product.service';
import { CategoryModule } from './category.module';
import { ProductUseCase } from '@application/use-cases/product.use-case';
import { ProductCategoryModule } from './product-category.module';
import { PRODUCT_IN_PORT } from '@application/ports/in/product.in-port';

@Module({
  imports: [DatabaseModule, CategoryModule, ProductCategoryModule],
  controllers: [ProductController],
  providers: [
    {
      provide: PRODUCT_PORT,
      useClass: ProductRepository,
    },
    {
      provide: PRODUCT_IN_PORT,
      useClass: ProductUseCase
    },
    ProductService,
    ProductUseCase
  ],
  exports: [ProductService],
})
export class ProductModule {}
