import { CategoryEntity } from '@domain/entities/category.entity';

export class CategoryResponseMapper {
  static createCategory(res: CategoryEntity) {
    return {
      uid: res.getUidValue(),
      name: res.getNameValue(),
      description: res.getDescriptionValue(),
      createdAt: res.getCreatedAtValue(),
    };
  }
}
