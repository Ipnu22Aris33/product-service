import { CategoryService } from '@application/services/category.service';
import { CreateCategoryUseCase } from '@application/use-cases/category/create-category.use-case';
import { DatabaseModule } from '@infrastructure/databases/database.module';
import { CategoryRepository } from '@infrastructure/databases/repositories/category.repository';
import { Module } from '@nestjs/common';
import { CategoryController } from '@presentation/controllers/category.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [
    {
      provide: 'CategoryRepository',
      useClass: CategoryRepository,
    },
    CategoryService,
    CreateCategoryUseCase,
  ],
})
export class CategoryModule {}
