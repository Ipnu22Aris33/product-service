import { DBMongooseModule } from '@infrastructure/databases/module/db-mongoose.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from '@presentation/module/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DBMongooseModule,
    CategoryModule
  ],
})
export class AppModule {}
