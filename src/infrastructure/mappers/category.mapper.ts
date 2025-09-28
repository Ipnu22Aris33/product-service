import { CategoryEntity } from '@domain/entities/category.entity';
import { DescriptionVO, NameVO, UidVO } from '@domain/value-object';
import { CategoryDocument } from '@infrastructure/databases/schemas/category.schema';

export class CategoryMapper {
  static fromPersistence(category: CategoryDocument): CategoryEntity {
    return CategoryEntity.fromProps({
      uid: UidVO.fromValue(category.uid),
      name: NameVO.fromValue(category.name),
      description: DescriptionVO.fromValue(category.description),
      isActive: category.isActive,
      createdBy: UidVO.fromValue(category.createdBy),
      updatedBy: UidVO.fromValue(category.updatedBy),
      deletedBy: UidVO.fromValue(category.deletedBy),
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      deletedAt: category.deletedAt,
    });
  }

  static toPersistence(category: CategoryEntity) {
    return category.toObject();
  }
}
