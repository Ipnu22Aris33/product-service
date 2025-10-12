import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

export const MongoDBConfig = MongooseModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    uri: config.get<string>('MONGO_URI'),
    dbName: config.get<string>('MONGO_DB_NAME'),
  }),
});
