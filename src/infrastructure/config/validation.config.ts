import { ValidationPipeOptions } from '@nestjs/common';
import { ValidationExceptionFactory } from './validation.exception';

export const ValidationConfig: ValidationPipeOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  exceptionFactory: ValidationExceptionFactory,
};
