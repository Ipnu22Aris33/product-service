import { CategoryService } from '@application/services/category.service';
import { ProductService } from '@application/services/product.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AddProductCategoriesUseCase {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  async execute(dto: { productUid: string; categoryUids: string[] }) {
    const product = await this.productService.findProductByUid({
      productUid: dto.productUid,
    });
    if (!product || product === null) throw new NotFoundException('ka');
    const categories = await Promise.all(
      dto.categoryUids.map((m) =>
        this.categoryService.findCategoryByUid({ categoryUid: m }),
      ),
    );
    if (categories.some((c) => !c))
      throw new NotFoundException('Category not Found j');

    return await this.productService.addProductCategories({
      productUid: product.getUidValue(),
      categoryUids: dto.categoryUids,
    });
  }
}
