import { ProductInPort } from '@application/ports/product.port';
import { CategoryService } from '@application/services/category.service';
import { ProductCategoryService } from '@application/services/product-category.service';
import { ProductService } from '@application/services/product.service';
import { CategoryEntity } from '@domain/entities/category.entity';
import { ProductCategoryEntity } from '@domain/entities/product-category.entity';
import { ProductCategoryFactory } from '@domain/factories/product-category.factory';
import { ProductFactory } from '@domain/factories/product.factory';
import { DescriptionVO, NameVO, PriceVO, StockVO, UidVO } from '@domain/value-objects';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProductInput,
  GetProductByUidInput,
  AddProductCategoriesInput,
} from '@application/types/input/product-input.type';

@Injectable()
export class ProductUseCase implements ProductInPort {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  async createProduct(dto: CreateProductInput) {
    const nameVO = NameVO.create(dto.name);
    const priceVO = PriceVO.create(dto.price);
    const stockVO = StockVO.create(dto.stock);
    const descriptionVO = DescriptionVO.create(dto.description);

    const product = new ProductFactory().createNew({
      props: {
        name: nameVO,
        price: priceVO,
        stock: stockVO,
        description: descriptionVO,
      },
    });

    await this.productService.save(product);
    return { product, message: '' };
  }

  async getProductByUid(dto: GetProductByUidInput) {
    if (!dto.uid) return null;

    const [product, productCategories] = await Promise.all([
      this.productService.findByUid(dto.uid),
      this.productCategoryService.findByProductUid(dto.uid),
    ]);

    if (!product) throw new NotFoundException('Product not found');

    const categoryUids = productCategories.map((pc) => pc.getCategoryUidValue());
    const categoryDetails = categoryUids.length > 0 ? await this.categoryService.findManyByUid(categoryUids) : [];

    const result = {
      product,
      productCategories,
      categoryDetails,
      message: 'Success fetch',
    };

    return result;
  }

  async getAllProducts() {
    const products = await this.productService.findAll();
    return products ?? [];
  }

  async addProductCategories(dto: AddProductCategoriesInput) {
    // 1. Fetch data
    const [product, categories, existingCategories] = await Promise.all([
      this.productService.findByUid(dto.productUid),
      this.categoryService.findManyByUid(dto.categoryUids),
      this.productCategoryService.findByProductUid(dto.productUid),
    ]);

    // 2. Validation
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // 3. Calculate UIDs
    const availableUids = categories.map((c) => c.getUidValue());
    const existingUids = existingCategories.map((ec) => ec.getCategoryUidValue());
    const notFoundUids = dto.categoryUids.filter((uid) => !availableUids.includes(uid));
    const newUids = dto.categoryUids.filter((uid) => availableUids.includes(uid) && !existingUids.includes(uid));

    // 4. Early return jika tidak ada yang baru
    if (!newUids.length) {
      return {
        product,
        added: {
          categories: [],
          details: [],
          count: 0,
        },
        notFound: {
          categoryUids: notFoundUids,
          count: notFoundUids.length,
        },
        message: 'No new categories to add',
      };
    }

    // 5. Create new product categories
    const factory = new ProductCategoryFactory();
    const newProductCategories = newUids.map((uid) =>
      factory.createNew({
        props: {
          productUid: UidVO.create(product.getUidValue()),
          categoryUid: UidVO.create(uid),
        },
      }),
    );

    const newCategoryDetails = categories.filter((c) => newUids.includes(c.getUidValue()));

    // 6. Persist
    await this.productCategoryService.bulkSave(newProductCategories);
    product.touch();

    // 7. Return result (declare di akhir)
    return {
      product,
      added: {
        categories: newProductCategories,
        details: newCategoryDetails,
        count: newProductCategories.length,
      },
      notFound: {
        categoryUids: notFoundUids,
        count: notFoundUids.length,
      },
      message: `Successfully added ${newProductCategories.length} categories`,
    };
  }
}
