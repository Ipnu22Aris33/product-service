import {
  CategoryEntity,
  CategoryEntityProps,
} from '@domain/entities/category.entity';
import { DescriptionVO, NameVO, UidVO } from '@domain/value-object';

export class CategoryFactory {
  static create(props: {
    name: NameVO;
    description: DescriptionVO | null;
    createdBy: UidVO;
  }) {
    const categoryProps: CategoryEntityProps = {
      ...props,
      uid: UidVO.create(),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      updatedBy: props.createdBy,
      deletedAt: null,
      deletedBy: null,
    };
    return CategoryEntity.fromProps(categoryProps);
  }
}
