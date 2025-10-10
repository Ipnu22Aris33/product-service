import { ProductCategoryEntity } from '@domain/entities/product-category.entity';
import { UidVO } from '@domain/value-objects';
import { ProductCategoryModel } from '@infrastructure/persistence/models/product-category.model';

export class ProductCategoryMapper {
  static fromPersistence(map: ProductCategoryModel): ProductCategoryEntity {
    return ProductCategoryEntity.reconstruct({
      uid: UidVO.fromValue(map.uid),
      productUid: UidVO.fromValue(map.productUid),
      categoryUid: UidVO.fromValue(map.categoryUid),
      createdAt: map.createdAt,
      updatedAt: map.updatedAt,
      deletedAt: map.deletedAt,
    });
  }

  static fromPersistenceArray(
    map: ProductCategoryModel[],
  ): ProductCategoryEntity[] {
    return map.map((pc) => this.fromPersistence(pc));
  }

  static toPersistence(map: ProductCategoryEntity): ProductCategoryModel {
    return {
      uid: map.getUidValue(),
      productUid: map.getProductUidValue(),
      categoryUid: map.getCategoryUidValue(),
      createdAt: map.getCreatedAtValue(),
      updatedAt: map.getUpdatedAtValue(),
      deletedAt: map.getDeletedAtValue(),
    };
  }

  static toPersistenceArray(
    maps: ProductCategoryEntity[],
  ): ProductCategoryModel[] {
    return maps.map((pc) => this.toPersistence(pc));
  }
}
