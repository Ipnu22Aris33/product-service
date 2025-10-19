import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductPort } from '@application/ports/out/product.out-port';
import { ProductEntity } from '@domain/entities/product.entity';
import {
  Product,
  ProductDocument,
} from '@infrastructure/persistence/databases/mongoose/schemas/product.schema';
import {
  ProductCategory,
  ProductCategoryDocument,
} from '@infrastructure/persistence/databases/mongoose/schemas/product-category.schema';
import { ProductMapper } from '@infrastructure/persistence/mappers/product.mapper';
import { ProductCategoryMapper } from '@infrastructure/persistence/mappers/product-category.mapper';
import { ProductCategoryEntity } from '@domain/entities/product-category.entity';

@Injectable()
export class ProductRepository implements ProductPort {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
    @InjectModel(ProductCategory.name)
    private readonly categoryModel: Model<ProductCategoryDocument>,
  ) {}

  // --------------------------------------------------
  // 🔹 PUBLIC METHODS (sesuai kontrak port)
  // --------------------------------------------------

  async save(product: ProductEntity): Promise<void> {
    await this.saveProduct(product);
    await this.saveCategories(product);
  }

  async findAll(): Promise<ProductEntity[]> {
    const productDocs = await this.productModel.find().exec();
    return ProductMapper.fromPersistenceArray(productDocs);
  }

  async findByUid(uid: string): Promise<ProductEntity | null> {
    // ✅ Validasi defensif
    if (!uid) return null;

    // ✅ Jalankan query paralel untuk efisiensi
    const [product, categories] = await Promise.all([
      this.findProduct(uid),
      this.findCategoriesByProductUid(uid),
    ]);

    if (!product) return null;

    // ✅ Set relasi kategori ke aggregate root
    product.setProductCategories(categories);

    return product;
  }

  // --------------------------------------------------
  // 🔸 PRIVATE HELPERS (detail implementasi)
  // --------------------------------------------------

  /** Simpan data produk utama */
  private async saveProduct(product: ProductEntity): Promise<void> {
    const doc = ProductMapper.toPersistence(product);
    await this.productModel.findOneAndUpdate({ uid: doc.uid }, doc, {
      upsert: true,
      new: true, // ✅ supaya mengembalikan dokumen terbaru (opsional)
      setDefaultsOnInsert: true,
    });
  }

  /** Simpan kategori produk (jika ada) */
  private async saveCategories(product: ProductEntity): Promise<void> {
    const categories = product.getProductCategories();
    if (!categories.length) return;

    const productUid = product.getUidValue();
    const docs = ProductCategoryMapper.toPersistenceArray(categories).map(
      (doc) => ({
        ...doc,
        productUid,
      }),
    );

    await Promise.all(
      docs.map((doc) =>
        this.categoryModel.findOneAndUpdate({ uid: doc.uid }, doc, {
          upsert: true,
          setDefaultsOnInsert: true,
        }),
      ),
    );
  }

  /** Ambil product dari persistence */
  private async findProduct(uid: string): Promise<ProductEntity | null> {
    if (!uid) return null; // ✅ validasi tambahan (opsional)
    const doc = await this.productModel.findOne({ uid }).exec();
    return doc ? ProductMapper.fromPersistence(doc) : null;
  }

  /** Ambil kategori berdasarkan UID product */
  private async findCategoriesByProductUid(
    uid: string,
  ): Promise<ProductCategoryEntity[]> {
    // ✅ Hindari query ke DB jika UID tidak valid
    if (!uid) return [];

    const docs = await this.categoryModel
      .find({ productUid: uid })
      .sort({ createdAt: -1 })
      .exec();

    return ProductCategoryMapper.fromPersistenceArray(docs);
  }
}
