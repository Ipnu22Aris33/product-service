import {
  CategoryEntity,
  CategoryEntityProps,
} from '@domain/entities/category.entity';
import {
  DescriptionVO,
  NameVO,
  StatusEnumType,
  StatusVO,
  UidVO,
} from '@domain/value-objects';
import { BaseFactory } from '@domain/base/base.factory';

export interface CategoryFactoryProps {
  name: NameVO;
  description: DescriptionVO | null;
}

export class CategoryFactory extends BaseFactory<{
  factoryProps: CategoryFactoryProps;
  entityProps: CategoryEntityProps;
  entity: CategoryEntity;
}> {
  protected entityClass = CategoryEntity;

  protected getDefaults(): Partial<CategoryEntityProps> {
    return {
      status: StatusVO.create(StatusEnumType.ACTIVE),
    };
  }

  createNew(props: { props: CategoryFactoryProps; actor?: UidVO }) {
    return this.create({
      props: {
        name: props.props.name,
        description: props.props.description,
      },
      actor: props.actor,
    });
  }
}
