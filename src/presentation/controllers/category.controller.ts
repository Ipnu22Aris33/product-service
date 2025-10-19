import {
  CATEGORY_IN_PORT,
  type CategoryInPort,
} from '@application/ports/in/category.in-port';
import { Body, Controller, Param, Post, Get, Inject } from '@nestjs/common';
import { CreateCategortRequestDTO } from '@presentation/dtos/request/category/create-category.request-dto';
import { ParamUidRequestDTO } from '@presentation/dtos/request/param/param-uid.request.dto';

@Controller('category')
export class CategoryController {
  constructor(
    @Inject(CATEGORY_IN_PORT) private readonly categoryInPort: CategoryInPort,
  ) {}

  @Post('create')
  async create(@Body() body: CreateCategortRequestDTO) {
    return this.categoryInPort.createCategory(body);
  }

  @Get(':uid')
  async findByUid(@Param() param: ParamUidRequestDTO) {
    return this.categoryInPort.getCategoryByUid({ uid: param.uid });
  }

  @Get()
  async findAll() {
    return await this.categoryInPort.getAllCategories();
  }
}
