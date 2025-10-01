import { ProductService } from '@application/services/product.service';
import { CreateProductUseCase } from '@application/use-cases/product/create-product.use-case';
import { FindAllProductUseCase } from '@application/use-cases/product/find-all-product.use-case';
import { FindProductByUidUseCase } from '@application/use-cases/product/find-product-by-uid.use-case';
import { FindProductByUidsUseCase } from '@application/use-cases/product/find-product-by-uids.use-case';
import { DatabaseModule } from '@infrastructure/databases/database.module';
import { ProductRepository } from '@infrastructure/databases/repositories/product.repository';
import { Module } from '@nestjs/common';
import { ProductController } from '@presentation/controllers/product.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [
    {
      provide: 'ProductPort',
      useClass: ProductRepository,
    },
    ProductService,
    CreateProductUseCase,
    FindAllProductUseCase,
    FindProductByUidUseCase,
    FindProductByUidsUseCase
  ],
})
export class ProductModule {}
