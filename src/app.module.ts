import { EnvConfig } from '@infrastructure/config/env.config';
import { DatabaseModule } from '@infrastructure/persistence/databases/database.module';
import { Module } from '@nestjs/common';
import { CategoryModule } from '@presentation/module/category.module';
import { ProductModule } from '@presentation/module/product.module';

@Module({
  imports: [EnvConfig, DatabaseModule, ProductModule, CategoryModule],
})
export class AppModule {}
