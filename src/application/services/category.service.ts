import { CreateCategoryUseCase } from '@application/use-cases/product/create-category.use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(private readonly createCategoryUseCase: CreateCategoryUseCase) {}

  async create(dto: {
    name: string;
    description: string | null;
    createBy: string;
  }) {
    
    return await this.createCategoryUseCase.execute(dto);
  }
}
