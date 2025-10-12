import { AddProductCategoriesServiceDTO } from '@application/dtos/service-dtos/add-category-to-product.dto';
import { CreateProductServiceDTO } from '@application/dtos/service-dtos/create-product.dto';
import {
  PRODUCT_PORT,
  type ProductPort,
} from '@application/ports/product.port';
import { ProductCategoryFactory } from '@domain/factores/product-category.factory';
import { ProductFactory } from '@domain/factores/product.factory';
import {
  DescriptionVO,
  NameVO,
  PriceVO,
  StatusEnumType,
  StatusVO,
  StockVO,
  UidVO,
} from '@domain/value-objects';
import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_PORT) private readonly productPort: ProductPort,
  ) {}

  async createProduct(dto: CreateProductServiceDTO) {
    const product = new ProductFactory().createNew({
      props: {
        name: NameVO.create(dto.name),
        price: PriceVO.create(dto.price),
        stock: StockVO.create(dto.stock),
        description: DescriptionVO.create(dto.description) ?? null,
      },
    });
    return await this.productPort.save(product);
  }

  async findProductByUid(dto: { productUid: string }) {
    const product = await this.productPort.findByUid(dto.productUid);
    return product ? product : null;
  }

  async findAllProduct() {
    const products = await this.productPort.findAll();
    return products ? products : [];
  }

  async addProductCategories(dto: AddProductCategoriesServiceDTO) {
    const product = await this.productPort.findByUid(dto.productUid);
    if (!product) return null;

    if (product.getStatusValue() === StatusEnumType.INACTIVE) {
      throw new UnprocessableEntityException('Cannot modify inactive product');
    }
    const existProductCategories = product.getProductCategories();
    for (const uid of dto.categoryUids) {
      const existing = existProductCategories.find(
        (c) => c.getCategoryUidValue() === uid,
      );

      if (existing) {
        if (existing.getStatusValue() === StatusEnumType.INACTIVE) {
          existing.changeStatus({
            newStatus: StatusVO.create(StatusEnumType.ACTIVE),
          });
          product.touch()
        }
      } else {
        const newCategory = new ProductCategoryFactory().createNew({
          props: {
            productUid: UidVO.fromValue(product.getUidValue()),
            categoryUid: UidVO.fromValue(uid),
          },
        });

        product.addCategory([newCategory]);
      }
    }

    return await this.productPort.save(product);
  }

  async removeProductCategories(dto: AddProductCategoriesServiceDTO) {
    const product = await this.productPort.findByUid(dto.productUid);
    if (!product) return null;

    if (dto.categoryUids && dto.categoryUids.length > 0) {
      // Panggil method removeCategory pada entity product
      product.removeCategory(dto.categoryUids);

      // Simpan perubahan ke database melalui port
      await this.productPort.save(product);
    }

    return product;
  }
}
