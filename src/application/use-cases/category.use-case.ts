import { CreateCategoryDTO } from '@application/dtos/category-dtos/create-category.dto';
import { ParamUidDTO } from '@application/dtos/param-dtos/param-uid.dto';
import { CreateCategoryUseCaseDTO } from '@application/dtos/use-case-dtos/create-category.dto';
import { CategoryInPort } from '@application/ports/in/category.in-port';
import { CategoryService } from '@application/services/category.service';
import { CategoryEntity } from '@domain/entities/category.entity';
import { CategoryFactory } from '@domain/factories/category.factory';
import { DescriptionVO, NameVO } from '@domain/value-objects';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CategoryUseCase implements CategoryInPort {
  constructor(private readonly categoryService: CategoryService) {}

  async createCategory(dto: CreateCategoryDTO): Promise<CategoryEntity> {
    const name = NameVO.create(dto.name);
    const description = DescriptionVO.create(dto.description);

    const category = new CategoryFactory().createNew({
      props: { name, description },
    });

    await this.categoryService.save(category);
    return category;
  }

  async getCategoryByUid(dto: ParamUidDTO) {
    const category = await this.categoryService.findByUid(dto.uid);
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async getAllCategories() {
    const categories = await this.categoryService.findAll();
    return categories ?? [];
  }
}
