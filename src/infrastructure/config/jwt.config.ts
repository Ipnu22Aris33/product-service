import { ConfigService } from '@nestjs/config';

export const JwtConfig = (config: ConfigService) => ({
  secret: config.getOrThrow<string>('JWT_SECRET'),
  expiresIn: config.get<string>('JWT_EXPIRES_IN') || '3600s',
});
