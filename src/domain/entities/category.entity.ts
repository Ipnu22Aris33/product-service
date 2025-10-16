import {
  UidVO,
  NameVO,
  DescriptionVO,
  StatusVO,
  StatusEnumType,
} from '@domain/value-objects';
import { BaseEntity, BaseEntityProps } from '@domain/base/base.entity';

export interface CategoryEntityProps extends BaseEntityProps {
  name: NameVO;
  description: DescriptionVO | null;
  status: StatusVO;
}

export class CategoryEntity extends BaseEntity<CategoryEntityProps> {
  private constructor(props: CategoryEntityProps) {
    super(props);
  }

  static create(props: CategoryEntityProps): CategoryEntity {
    return new CategoryEntity(props);
  }

  static reconstruct(props: CategoryEntityProps): CategoryEntity {
    return new CategoryEntity(props);
  }

  changeName(props: { newName: NameVO; actor: UidVO }) {
    const { newName, actor } = props;
    if (!this.props.name.equals(newName)) {
      this.props.name = newName;
      this.touch(actor);
    }
  }

  changeDescription(props: { newDesc: DescriptionVO | null; actor: UidVO }) {
    const { newDesc, actor } = props;
    if (
      (this.props.description === null && newDesc !== null) ||
      (this.props.description !== null &&
        newDesc !== null &&
        !this.props.description.equals(newDesc)) ||
      (this.props.description !== null && newDesc === null)
    ) {
      this.props.description = newDesc;
      this.touch(actor);
    }
  }

  changeStatus(props: { newStatus: StatusVO; actor?: UidVO }) {
    const { newStatus, actor } = props;
    if (!this.props.status.equals(newStatus)) {
      this.props.status = newStatus;
      this.touch(actor);
    }
  }

  getUidValue(): string {
    return this.props.uid.getValue();
  }
  getNameValue(): string {
    return this.props.name.getValue();
  }
  getDescriptionValue(): string | null {
    return this.props.description ? this.props.description.getValue() : null;
  }
  getStatusValue(): StatusEnumType {
    return this.props.status.getValue();
  }
}
