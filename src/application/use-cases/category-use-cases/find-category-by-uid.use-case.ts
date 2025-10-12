import { CategoryService } from '@application/services/category.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FindCategoryByUseCase {
  constructor(private readonly categoryService: CategoryService) {}

  async execute(dto: { categoryUid: string }) {
    const cat = await this.categoryService.findCategoryByUid(dto);
    if (!cat || cat === null) throw new NotFoundException('Category Not Found');
    return cat;
  }
}
