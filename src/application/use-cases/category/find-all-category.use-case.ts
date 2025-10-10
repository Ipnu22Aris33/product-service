import { CategoryService } from '@application/services/category.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllCategoryUseCase {
  constructor(private readonly categoryService: CategoryService) {}

  async execute() {
    return this.categoryService.findAllCategory();
  }
}
