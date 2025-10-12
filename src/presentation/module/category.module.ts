import { Module } from '@nestjs/common';
import { CATEGORY_PORT } from '@application/ports/category.port';
import { DatabaseModule } from '@infrastructure/persistence/databases/database.module';
import { CategoryRepository } from '@infrastructure/persistence/databases/mongoose/repositories/category.repository';
import { CategoryController } from '@presentation/controllers/category.controller';
import { CategoryService } from '@application/services/category.service';
import {
  CreateCategoryUseCase,
  FindCategoryByUseCase,
} from '@application/use-cases/category-use-cases';
import { FindAllCategoryUseCase } from '@application/use-cases/category-use-cases/find-all-category.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [
    {
      provide: CATEGORY_PORT,
      useClass: CategoryRepository,
    },
    CategoryService,
    CreateCategoryUseCase,
    FindCategoryByUseCase,
    FindAllCategoryUseCase
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
