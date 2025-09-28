import { UidVO, NameVO, DescriptionVO } from '@domain/value-object';

export interface CategoryEntityProps {
  uid: UidVO;
  name: NameVO;
  description: DescriptionVO | null;
  isActive: boolean;
  updatedAt: Date;
  createdBy: UidVO;
  createdAt: Date;
  updatedBy: UidVO;
  deletedAt: Date | null;
  deletedBy: UidVO | null;
}

export class CategoryEntity {
  private constructor(private readonly props: CategoryEntityProps) {}

  static fromProps(props: CategoryEntityProps): CategoryEntity {
    return new CategoryEntity(props);
  }

  private touch(updatedBy: UidVO) {
    this.props.updatedBy = updatedBy;
    this.props.updatedAt = new Date();
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

  getUid(): string {
    return this.props.uid.getValue();
  }
  getName(): string {
    return this.props.name.getValue();
  }
  getDescription(): string | null {
    return this.props.description?.getValue() || null;
  }
  getIsActive(): boolean {
    return this.props.isActive;
  }
  getCreatedAt(): Date {
    return this.props.createdAt;
  }
  getCreatedBy(): string {
    return this.props.createdBy.getValue();
  }
  getUpdatedAt(): Date {
    return this.props.updatedAt;
  }
  getUpdatedBy(): string {
    return this.props.updatedBy.getValue();
  }
  getDeletedAt(): Date | null {
    return this.props.deletedAt;
  }
  getDeletedBy(): string | null {
    return this.props.deletedBy?.getValue() || null;
  }

  toObject() {
    return {
      uid: this.getUid(),
      name: this.getName(),
      description: this.getDescription(),
      isActive: this.getIsActive(),
      createdAt: this.getCreatedAt(),
      createdBy: this.getCreatedBy(),
      updatedAt: this.getUpdatedAt(),
      updatedBy: this.getUpdatedBy(),
      deletedAt: this.getDeletedAt(),
      deletedBy: this.getDeletedBy(),
    };
  }
}
