import {
  UidVO,
  CodeVO,
  NameVO,
  PriceVO,
  StockVO,
  DescriptionVO,
} from '@domain/value-objects';
import { ProductCategoryEntity } from './product-category.entity';
import { BaseEntity, BaseEntityProps } from '@domain/base/base.entity';
import { StatusEnumType, StatusVO } from '@domain/value-objects/status.vo';

export interface ProductEntityProps extends BaseEntityProps {
  code: CodeVO;
  name: NameVO;
  price: PriceVO;
  stock: StockVO;
  status: StatusVO;
  description: DescriptionVO | null;
}

export class ProductEntity extends BaseEntity<ProductEntityProps> {
  private productCategories: ProductCategoryEntity[] = [];

  private constructor(
    props: ProductEntityProps,
    categories: ProductCategoryEntity[] = [],
  ) {
    super(props);
    this.productCategories = categories;
  }

  static create(props: ProductEntityProps): ProductEntity {
    return new ProductEntity(props);
  }

  static reconstruct(
    props: ProductEntityProps,
    categories: ProductCategoryEntity[] = [],
  ): ProductEntity {
    return new ProductEntity(props, categories);
  }

  addCategory(categories: ProductCategoryEntity[]): void {
    const newCats: ProductCategoryEntity[] = [];

    categories.forEach((c) => {
      const exists = this.productCategories.some((pc) => pc.equals(c));
      if (!exists) newCats.push(c);
    });

    if (newCats.length === 0) return;

    this.productCategories.push(...newCats);
    this.touch();
  }

  setProductCategories(categories: ProductCategoryEntity[]): void {
    this.productCategories = categories;
  }

  removeCategory(categoryUids: string[]): void {
    const uidsToRemove = new Set(categoryUids);
    const newStatus = StatusVO.create(StatusEnumType.INACTIVE)

    this.productCategories.forEach((c) => {
      if (uidsToRemove.has(c.getCategoryUidValue())) {
        c.changeStatus({newStatus});
      }
    });

    this.touch();
  }

  changePrice() {}

  changeStock() {}

  getProductCategories(): ProductCategoryEntity[] {
    return [...this.productCategories];
  }
  getNameValue(): string {
    return this.props.name.getValue();
  }
  getCodeValue(): string {
    return this.props.code.getValue();
  }
  getPriceValue(): number {
    return this.props.price.getValue();
  }
  getStockValue(): number {
    return this.props.stock.getValue();
  }
  getDescriptionValue(): string | null {
    return this.props.description ? this.props.description.getValue() : null;
  }
  getStatusValue(): StatusEnumType {
    return this.props.status.getValue();
  }
}
