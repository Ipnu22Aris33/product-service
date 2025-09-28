import type { ICategoryRepository } from '@application/ports/category-repository.port';
import { CategoryFactory } from '@domain/factores/category.factory';
import { NameVO } from '@domain/value-object';
import { DescriptionVO } from '@domain/value-object';
import { UidVO } from '@domain/value-object';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject('CategoryRepository') private readonly repo: ICategoryRepository,
  ) {}
  async execute(dto: {
    name: string;
    description: string | null;
    createBy: string;
  }) {
    return this.repo.save(
      CategoryFactory.create({
        name: NameVO.create(dto.name),
        description: DescriptionVO.create(dto.description) ?? null,
        createdBy: UidVO.fromValue(dto.createBy),
      }),
    );
  }
}
