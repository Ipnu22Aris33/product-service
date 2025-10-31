import { AssignCategoriesToProductDTO } from '@application/dtos/use-case-dtos/assign-categories-to-product.dto';
import { CategoryService } from '@application/services/category.service';
import { ProductCategoryService } from '@application/services/product-category.service';
import { ProductService } from '@application/services/product.service';
import { CategoryEntity } from '@domain/entities/category.entity';
import { ProductCategoryEntity } from '@domain/entities/product-category.entity';
import { ProductCategoryFactory } from '@domain/factories/product-category.factory';
import { UidVO } from '@domain/value-objects';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductCategoryUseCase {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  async assignCategoriesToProduct(dto: AssignCategoriesToProductDTO) {
    const [product, categories, existingCategories] = await Promise.all([
      this.productService.findByUid(dto.productUid),
      this.categoryService.findManyByUid(dto.categoryUids),
      this.productCategoryService.findByProductUid(dto.productUid),
    ]);

    if (!product) throw new NotFoundException('Product not found');

    const availableUids = categories.map((c) => c.getUidValue());
    const existingUids = existingCategories.map((ec) =>
      ec.getCategoryUidValue(),
    );

    const notFoundUids = dto.categoryUids.filter(
      (uid) => !availableUids.includes(uid),
    );

    const newUids = dto.categoryUids.filter(
      (uid) => availableUids.includes(uid) && !existingUids.includes(uid),
    );

    const result = {
      product,
      added: {
        categories: [] as ProductCategoryEntity[],
        details: [] as CategoryEntity[],
        count: 0,
      },
      notFound: {
        categoryUids: notFoundUids,
        count: notFoundUids.length,
      },
      message: '',
    };

    if (!newUids.length) {
      result.message = 'No new categories to add';
      return result;
    }

    const factory = new ProductCategoryFactory();
    result.added.categories = newUids.map((uid) =>
      factory.createNew({
        props: {
          productUid: UidVO.create(product.getUidValue()),
          categoryUid: UidVO.create(uid),
        },
      }),
    );

    result.added.details = categories.filter((c) =>
      newUids.includes(c.getUidValue()),
    );

    await this.productCategoryService.bulkSave(result.added.categories);
    product.touch();

    result.added.count = result.added.categories.length;
    result.message = `Successfully added ${result.added.count} categories`;

    return result;
  }
}
