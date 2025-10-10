import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { Category, CategorySchema } from './schemas/category.schema';
import {
  ProductCategory,
  ProductCategorySchema,
} from './schemas/product-category.schema';
import { Product, ProductSchema } from './schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGOOSE_URI'),
      }),
    }),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: ProductCategory.name, schema: ProductCategorySchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
