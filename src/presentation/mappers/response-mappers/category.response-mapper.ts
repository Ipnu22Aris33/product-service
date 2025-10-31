import { CreateCategoryResult } from '@application/types/category-use-case.type';

export class CategoryResponseMapper {
  static createCategory(res: CreateCategoryResult) {
    return {
      message: res.message,
      data: {
        uid: res.category.getUidValue(),
        name: res.category.getNameValue(),
        description: res.category.getDescriptionValue(),
        createdBy: res.category.getCreatedByValue(),
        createdAt: res.category.getCreatedAtValue(),
      }
    };
  }
}
