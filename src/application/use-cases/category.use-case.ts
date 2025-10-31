import { CategoryInPort } from '@application/ports/category.port';
import { CategoryService } from '@application/services/category.service';
import { CategoryFactory } from '@domain/factories/category.factory';
import { DescriptionVO, NameVO } from '@domain/value-objects';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryInput, GetCategoryByUidInput } from '@application/types/input/category-input.type';

@Injectable()
export class CategoryUseCase implements CategoryInPort {
  constructor(private readonly categoryService: CategoryService) {}

  async createCategory(dto: CreateCategoryInput) {
    const name = NameVO.create(dto.name);
    const description = DescriptionVO.create(dto.description);

    const category = new CategoryFactory().createNew({
      props: { name, description },
    });

    const saved = await this.categoryService.save(category);

    return {
      category,
      message: 'Successfully create category',
    };
  }

  async getCategoryByUid(dto: GetCategoryByUidInput) {
    const category = await this.categoryService.findByUid(dto.uid);
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async getAllCategories() {
    const categories = await this.categoryService.findAll();
    return categories ?? [];
  }
}
