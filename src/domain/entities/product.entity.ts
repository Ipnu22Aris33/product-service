import {
  UidVO,
  CodeVO,
  NameVO,
  PriceVO,
  StockVO,
  DescriptionVO,
} from '@domain/value-object';
import { ProductCategoryEntity } from './product-category.entity';

export interface ProductEntityProps {
  uid: UidVO;
  code: CodeVO;
  name: NameVO;
  price: PriceVO;
  stock: StockVO;
  description: DescriptionVO | null;
  updatedAt: Date;
  createdAt: Date;
  deletedAt: Date | null;
}

export class ProductEntity {
  private constructor(
    private readonly props: ProductEntityProps,
    private productCategories: ProductCategoryEntity[] = [],
  ) {}

  private touch() {
    this.props.updatedAt = new Date();
  }

  static fromProps(props: ProductEntityProps): ProductEntity {
    return new ProductEntity(props);
  }

  addCategory(categories: ProductCategoryEntity[]): void {
    const existing = new Set(this.productCategories.map((c) => c.getUid()));
    categories.forEach((c) => {
      if (!existing.has(c.getUid())) {
        this.productCategories.push(c);
      }
    });
    this.touch();
  }

  removeCategory(categoryUids: string[]): void {
    const uidsToRemove = new Set(categoryUids);
    this.productCategories = this.productCategories.filter(
      (c) => !uidsToRemove.has(c.getUid()),
    );
    this.touch();
  }

  getCategories(): ProductCategoryEntity[] {
    return [...this.productCategories];
  }

  getUid(): string {
    return this.props.uid.getValue();
  }
  getName(): string {
    return this.props.name.getValue();
  }
  getCode(): string {
    return this.props.code.getValue();
  }
  getPrice(): number {
    return this.props.price.getValue();
  }
  getStock(): number {
    return this.props.stock.getValue();
  }
  getDescription(): string | null {
    return this.props.description?.getValue() ?? null;
  }
  getCreatedAt(): Date {
    return this.props.createdAt;
  }
  getUpdatedAt(): Date {
    return this.props.updatedAt;
  }
  getDeletedAt(): Date | null {
    return this.props.deletedAt ?? null;
  }

  toObject(): {
    uid: string;
    code: string;
    name: string;
    price: number;
    stock: number;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  } {
    return {
      uid: this.getUid(),
      code: this.getCode(),
      name: this.getName(),
      price: this.getPrice(),
      stock: this.getStock(),
      description: this.getDescription(),
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt(),
      deletedAt: this.getDeletedAt(),
    };
  }
}
