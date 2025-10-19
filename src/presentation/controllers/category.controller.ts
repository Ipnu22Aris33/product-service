import {
  CATEGORY_IN_PORT,
  type CategoryInPort,
} from '@application/ports/in/category.in-port';
import { Body, Controller, Param, Post, Get, Inject } from '@nestjs/common';

@Controller('category')
export class CategoryController {
  constructor(
    @Inject(CATEGORY_IN_PORT) private readonly categoryInPort: CategoryInPort,
  ) {}

  @Post('create')
  async create(@Body() dto: { name: string; description: string }) {
    return this.categoryInPort.createCategory(dto);
  }

  @Get(':uid')
  async findByUid(@Param() param: { uid: string }) {
    return this.categoryInPort.getCategoryByUid({ uid: param.uid });
  }

  @Get()
  async findAll() {
    return await this.categoryInPort.getAllCategories();
  }
}
