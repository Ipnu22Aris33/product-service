import { CreateCategoryServiceDTO } from '@application/dtos/service-dtos/create-category.dto';
import { CATEGORY_PORT, type CategoryPort } from '@application/ports/category.port';
import { CategoryFactory } from '@domain/factores/category.factory';
import { DescriptionVO, NameVO } from '@domain/value-objects';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_PORT) private readonly categoryPort: CategoryPort,
  ) {}

  async createCategory(dto: CreateCategoryServiceDTO) {
    const category = new CategoryFactory().createNew({
      props: {
        name: NameVO.create(dto.name),
        description: DescriptionVO.create(dto.description) ?? null,
      },
    });
    return await this.categoryPort.save(category);
  }

  async findCategoryByUid(dto: { categoryUid: string }) {
    const category = await this.categoryPort.findByUid(dto.categoryUid);
    return category ? category : null;
  }

  async findAllCategory(){
    const category = await this.categoryPort.findAll();
    return category ? category : [];
  }
}
