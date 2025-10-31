import {
  CATEGORY_OUT_PORT,
  type CategoryOutPort,
} from '@application/ports/category.port';
import { CategoryEntity } from '@domain/entities/category.entity';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_OUT_PORT) private readonly port: CategoryOutPort,
  ) {}

  async save(category: CategoryEntity): Promise<void> {
    await this.port.save(category);
  }

  async findByUid(uid: string): Promise<CategoryEntity | null> {
    return await this.port.findByUid(uid);
  }

  async findAll(): Promise<CategoryEntity[]> {
    return await this.port.findAll();
  }

  async findManyByUid(uids: string[]): Promise<CategoryEntity[]> {
    if (!uids.length) return [];
    return await this.port.findManyByUid(uids);
  }
}
