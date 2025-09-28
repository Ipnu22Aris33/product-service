import { CategoryService } from '@application/services/category.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  async create(
    @Body() dto: { name: string; description: string; createBy: string },
  ) {
    return this.categoryService.create(dto);
  }
}
