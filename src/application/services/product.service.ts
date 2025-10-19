import { AddProductCategoriesServiceDTO } from '@application/dtos/service-dtos/add-category-to-product.dto';
import { CreateProductServiceDTO } from '@application/dtos/service-dtos/create-product.dto';
import {
  PRODUCT_PORT,
  type ProductPort,
} from '@application/ports/out/product.out-port';
import { ProductEntity } from '@domain/entities/product.entity';
import { ProductCategoryFactory } from '@domain/factories/product-category.factory';
import { ProductFactory } from '@domain/factories/product.factory';
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

  async save(entity: ProductEntity): Promise<void> {
    await this.productPort.save(entity);
  }

  async findByUid(entity: {
    productUid: string;
  }): Promise<ProductEntity | null> {
    return await this.productPort.findByUid(entity.productUid);
  }

  async findAll(): Promise<ProductEntity[]> {
    return await this.productPort.findAll();
  }
  async createProduct(dto: CreateProductServiceDTO) {
    const product = new ProductFactory().createNew({
      props: {
        name: NameVO.create(dto.name),
        price: PriceVO.create(dto.price),
        stock: StockVO.create(dto.stock),
        description: DescriptionVO.create(dto.description) ?? null,
      },
    });
    await this.productPort.save(product);
    return product;
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

    const categories = dto.categoryUids.map((uid) =>
      new ProductCategoryFactory().createNew({
        props: {
          productUid: UidVO.fromValue(product.getUidValue()),
          categoryUid: UidVO.fromValue(uid),
        },
      }),
    );

    product.addCategory(categories);
    await this.productPort.save(product);
    return product;
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
