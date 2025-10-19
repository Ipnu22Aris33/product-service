import { CATEGORY_OUT_PORT } from '@application/ports/out/category.out-port';
import { PRODUCT_CATEGORY_OUT_PORT } from '@application/ports/out/product-category.out-port';
import { ProductCategoryService } from '@application/services/product-category.service';
import { DatabaseModule } from '@infrastructure/persistence/databases/database.module';
import { ProductCategoryRepository } from '@infrastructure/persistence/databases/mongoose/repositories/product-category.repository';
import { Module, Provider } from '@nestjs/common';

const PortProviders: Provider[] = [
  { provide: PRODUCT_CATEGORY_OUT_PORT, useClass: ProductCategoryRepository },
];

@Module({
  imports: [DatabaseModule],
  providers: [...PortProviders, ProductCategoryService],
  exports: [ProductCategoryService],
})
export class ProductCategoryModule {}
