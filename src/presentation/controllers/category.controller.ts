import { CreateCategoryUseCase } from '@application/use-cases/category/create-category.use-case';
import { FindAllCategoryUseCase } from '@application/use-cases/category/find-all-category.use-case';
import { FindCategoryByUseCase } from '@application/use-cases/category/find-category-by-uid.use-case';
import { Body, Controller, Param, Post, Get } from '@nestjs/common';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly createCategory: CreateCategoryUseCase,
    private readonly findCategoryByUid: FindCategoryByUseCase,
    private readonly findAllCategory: FindAllCategoryUseCase
  ) {}

  @Post('create')
  async create(@Body() dto: { name: string; description: string }) {
    return this.createCategory.execute(dto);
  }

  @Get(':categoryUid')
  async findByUid(@Param() dto: { categoryUid: string }) {
    console.log(dto)
    return this.findCategoryByUid.execute(dto);
  }

  @Get()
  async findAll(){
    return await this.findAllCategory.execute()
  }
}
