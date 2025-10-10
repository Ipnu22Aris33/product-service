import { UidVO, NameVO, DescriptionVO } from '@domain/value-objects';
import { BaseEntity, BaseEntityProps } from '@domain/base/base.entity';

export interface CategoryEntityProps extends BaseEntityProps {  
  name: NameVO;
  description: DescriptionVO | null;
  isActive: boolean;
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

  changeName(newName: NameVO, updatedBy: UidVO) {
    if (!this.props.name.equals(newName)) {
      this.props.name = newName;
      this.touch(updatedBy);
    }
  }

  changeIsActive(isActive: boolean, updatedBy: UidVO) {
    if (this.props.isActive !== isActive) {
      this.props.isActive = isActive;
      this.touch(updatedBy);
    }
  }

  changeDescription(newDesc: DescriptionVO | null, updatedBy: UidVO) {
    if (
      (this.props.description === null && newDesc !== null) ||
      (this.props.description !== null &&
        newDesc !== null &&
        !this.props.description.equals(newDesc))
    ) {
      this.props.description = newDesc;
      this.touch(updatedBy);
    }
  }

  getUidValue(): string {
    return this.props.uid.getValue();
  }
  getNameValue(): string {
    return this.props.name.getValue();
  }
  getDescriptionValue(): string | null {
    return this.props.description?.getValue() || null;
  }
  getIsActiveValue(): boolean {
    return this.props.isActive;
  }

  toObject() {
    return {
      uid: this.getUidValue(),
      name: this.getNameValue(),
      description: this.getDescriptionValue(),
      isActive: this.getIsActiveValue(),
      createdAt: this.getCreatedAtValue(),
      createdBy: this.getCreatedByValue(),
      updatedAt: this.getUpdatedAtValue(),
      updatedBy: this.getUpdatedByValue(),
      deletedAt: this.getDeletedAtValue(),
      deletedBy: this.getDeletedByValue(),
    };
  }
}
