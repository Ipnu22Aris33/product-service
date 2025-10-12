import { ConfigService } from '@nestjs/config';

export const AppConfig = function (config: ConfigService) {
  return {
    port: config.get<number>('PORT') || 3020,
    globalPrefix: config.get<string>('GLOBAL_PREFIX') || 'product-service',
  };
};
