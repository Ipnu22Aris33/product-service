import { CreateCategoryUseCase } from '@application/use-cases/category/create-category.use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(private readonly createCategoryUseCase: CreateCategoryUseCase) {}

  async create(dto: {
    name: string;
    description: string | null;
    createdBy: string;
  }) {
    return await this.createCategoryUseCase.execute(dto);
  }
}
