import type { CategoryPort } from '@application/ports/category.port';
import { CategoryEntity } from '@domain/entities/category.entity';
import { CategoryFactory } from '@domain/factores/category.factory';
import { NameVO } from '@domain/value-object';
import { DescriptionVO } from '@domain/value-object';
import { UidVO } from '@domain/value-object';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject('CategoryRepository') private readonly repo: CategoryPort,
  ) {}
  async execute(dto: {
    name: string;
    description: string | null;
    createdBy: string;
  }): Promise<CategoryEntity> {
    return this.repo.save(
      CategoryFactory.create({
        name: NameVO.create(dto.name),
        description: DescriptionVO.create(dto.description) ?? null,
        createdBy: UidVO.fromValue(dto.createdBy),
      }),
    );
  }
}
