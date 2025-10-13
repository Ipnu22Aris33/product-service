import { ValidationPipeOptions } from '@nestjs/common';

export const ValidationConfig: ValidationPipeOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
};
