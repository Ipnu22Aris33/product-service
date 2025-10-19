import { Module, Provider } from '@nestjs/common';
import { CATEGORY_OUT_PORT } from '@application/ports/out/category.out-port';
import { DatabaseModule } from '@infrastructure/persistence/databases/database.module';
import { CategoryRepository } from '@infrastructure/persistence/databases/mongoose/repositories/category.repository';
import { CategoryController } from '@presentation/controllers/category.controller';
import { CategoryService } from '@application/services/category.service';
import { CategoryUseCase } from '@application/use-cases/category.use-case';
import { CATEGORY_IN_PORT } from '@application/ports/in/category.in-port';

const categoryPortProviders: Provider[] = [
  { provide: CATEGORY_IN_PORT, useClass: CategoryUseCase },
  { provide: CATEGORY_OUT_PORT, useClass: CategoryRepository },
];

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [...categoryPortProviders, CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
