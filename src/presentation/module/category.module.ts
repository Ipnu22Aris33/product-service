import { CategoryService } from '@application/services/category.service';
import { CreateCategoryUseCase } from '@application/use-cases/product/create-category.use-case';
import {
  Category,
  CategorySchema,
} from '@infrastructure/databases/schemas/category.schema';
import { CategoryRepository } from '@infrastructure/repositories/category.repository';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from '@presentation/controllers/category.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers:[CategoryController],
  providers: [
    {
      provide: 'CategoryRepository',
      useClass: CategoryRepository,
    },
    CategoryService,
    CreateCategoryUseCase
  ],
})
export class CategoryModule {}
