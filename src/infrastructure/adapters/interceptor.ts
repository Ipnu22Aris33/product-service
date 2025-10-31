import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ResponseLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP-Response');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const startTime = Date.now();

    return next.handle().pipe(
      tap((responseBody) => {
        const res = context.switchToHttp().getResponse();
        const { statusCode } = res;
        const responseTime = Date.now() - startTime;

        this.logger.log(
          JSON.stringify({
            timestamp: new Date().toISOString(),
            labels: {
              route: req.url,
              method: req.method,
              statusCode: statusCode.toString(),
            },
            responseBody,
            responseTime: `${responseTime}ms`,
          }),
        );
      }),
    );
  }
}
