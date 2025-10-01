import { DatabaseModule } from '@infrastructure/databases/database.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from '@presentation/module/category.module';
import { ProductModule } from '@presentation/module/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ProductModule,
    CategoryModule,
  ],
})
export class AppModule {}
