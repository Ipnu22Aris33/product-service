import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Category, CategorySchema } from './schemas/category.schema';
import {
  ProductCategory,
  ProductCategorySchema,
} from './schemas/product-category.schema';
import { Product, ProductSchema } from './schemas/product.schema';
import { MongoDBConfig } from '@infrastructure/config/mongodb.config';

@Module({
  imports: [
    MongoDBConfig,
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: ProductCategory.name, schema: ProductCategorySchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DBMongooseModule {}
