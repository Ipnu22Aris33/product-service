import { CreateCategoryUseCaseDTO } from '@application/dtos/use-case-dtos/create-category.dto';
import { CategoryService } from '@application/services/category.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateCategoryUseCase {
  constructor(private readonly categoryService: CategoryService) {}

  async execute(dto: CreateCategoryUseCaseDTO) {
    return await this.categoryService.createCategory(dto);
  }
}
