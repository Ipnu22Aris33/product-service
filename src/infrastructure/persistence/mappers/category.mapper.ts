import { CategoryEntity } from '@domain/entities/category.entity';
import { DescriptionVO, NameVO, StatusVO, UidVO } from '@domain/value-objects';
import { CategoryModel } from '@infrastructure/persistence/models/category.model';

export class CategoryMapper {
  static fromPersistence(category: CategoryModel): CategoryEntity {
    return CategoryEntity.reconstruct({
      uid: UidVO.fromValue(category.uid),
      name: NameVO.fromValue(category.name),
      description: DescriptionVO.fromValue(category.description),
      status: StatusVO.fromValue (category.status),
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      deletedAt: category.deletedAt,
    });
  }

  static fromPersistenceArray(categories: CategoryModel[]): CategoryEntity[] {
    return categories.map((c) => this.fromPersistence(c));
  }

  static toPersistence(category: CategoryEntity): CategoryModel {
    return {
      uid: category.getUidValue(),
      name: category.getNameValue(),
      description: category.getDescriptionValue(),
      status: category.getStatusValue(),
      createdAt: category.getCreatedAtValue(),
      updatedAt: category.getUpdatedAtValue(),
      deletedAt: category.getDeletedAtValue(),
    };
  }

  static toPersistenceArray(categories: CategoryEntity[]): CategoryModel[] {
    return categories.map((c) => this.toPersistence(c));
  }
}
