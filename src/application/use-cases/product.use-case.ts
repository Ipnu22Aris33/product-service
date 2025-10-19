import { ParamUidDTO } from '@application/dtos/param-dtos/param-uid.dto';
import { AddProductCategoriesDTO } from '@application/dtos/use-case-dtos/add-product-categories.dto';
import { CreateProductUseCaseDTO } from '@application/dtos/use-case-dtos/create-product.dto';
import { ProductInPort } from '@application/ports/in/product.in-port';
import { CategoryService } from '@application/services/category.service';
import { ProductCategoryService } from '@application/services/product-category.service';
import { ProductService } from '@application/services/product.service';
import { CategoryEntity } from '@domain/entities/category.entity';
import { ProductCategoryEntity } from '@domain/entities/product-category.entity';
import { ProductCategoryFactory } from '@domain/factories/product-category.factory';
import { ProductFactory } from '@domain/factories/product.factory';
import {
  DescriptionVO,
  NameVO,
  PriceVO,
  StockVO,
  UidVO,
} from '@domain/value-objects';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductUseCase implements ProductInPort {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  async createProduct(dto: CreateProductUseCaseDTO) {
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
    return product;
  }

  async getProductByUid(dto: ParamUidDTO) {
    if (!dto.uid) return null;
    const product = await this.productService.findByUid(dto.uid);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async getAllProducts() {
    const products = await this.productService.findAll();
    return products ?? [];
  }

  async addProductCategories(dto: AddProductCategoriesDTO) {
    const [product, categories, existingCategories] = await Promise.all([
      this.productService.findByUid(dto.productUid),
      this.categoryService.findManyByUid(dto.categoryUids),
      this.productCategoryService.findByProductUid(dto.productUid),
    ]);

    if (!product) throw new NotFoundException('Product not found');

    const availableCategoryUids = categories.map((c) => c.getUidValue());

    // ambil UID kategori yang sudah terkait dengan produk
    const existingProductCategoryUids = existingCategories.map((ec) =>
      ec.getCategoryUidValue(),
    );

    // tentukan kategori yang tidak ditemukan di DB
    const notFoundCategoryUids = dto.categoryUids.filter(
      (uid) => !availableCategoryUids.includes(uid),
    );

    // tentukan kategori yang valid dan belum ada di produk → perlu dibuat baru
    const newCategoryUidsToAdd = dto.categoryUids.filter(
      (uid) =>
        availableCategoryUids.includes(uid) &&
        !existingProductCategoryUids.includes(uid),
    );

    const result = {
      product,
      added: {
        categories: [] as ProductCategoryEntity[],
        details: [] as CategoryEntity[],
        count: 0,
      },
      notFound: {
        categoryUids: notFoundCategoryUids,
        count: notFoundCategoryUids.length,
      },
      message: '',
    };

    if (newCategoryUidsToAdd.length === 0) {
      result.message = 'No new categories to add'
      return result;
    }

    result.added.categories = newCategoryUidsToAdd.map((uid) =>
      new ProductCategoryFactory().createNew({
        props: {
          productUid: UidVO.create(product.getUidValue()),
          categoryUid: UidVO.create(uid),
        },
      }),
    );

    result.added.details = categories.filter((c) =>
      newCategoryUidsToAdd.includes(c.getUidValue()),
    );

    
    await this.productCategoryService.bulkSave(result.added.categories);
    product.touch();
    
    result.added.count = result.added.categories.length;
    result.message = `Successfully added ${result.added.count} categories`
    return result;
  }
}
