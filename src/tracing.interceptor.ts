import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { trace, context, SpanStatusCode, Span, Attributes } from '@opentelemetry/api';

@Injectable()
export class TracingInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const request = ctx.switchToHttp().getRequest();
    const response = ctx.switchToHttp().getResponse();
    
    // Gunakan active span dari auto-instrumentation
    const activeSpan = trace.getActiveSpan();
    
    if (activeSpan) {
      // Tambahkan basic attributes saja
      this.addBasicRequestAttributes(activeSpan, request);
      
      const start = Date.now();
      
      return next.handle().pipe(
        tap({
          next: (data) => {
            const duration = Date.now() - start;
            this.addResponseEvent(activeSpan, data, response.statusCode, duration);
          },
          error: (error) => {
            this.addErrorEvent(activeSpan, error);
            activeSpan.setAttribute('http.status_code', error.status || 500);
            activeSpan.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
            activeSpan.recordException(error);
          },
        }),
      );
    }
    
    // Fallback: buat span baru jika tidak ada active span
    const tracer = trace.getTracer('product-service');
    const span = tracer.startSpan(`${request.method} ${request.route?.path || request.url}`);
    
    return context.with(trace.setSpan(context.active(), span), () => {
      this.addBasicRequestAttributes(span, request);
      const start = Date.now();
      
      return next.handle().pipe(
        tap({
          next: (data) => {
            const duration = Date.now() - start;
            this.addResponseEvent(span, data, response.statusCode, duration);
            span.setStatus({ code: SpanStatusCode.OK });
          },
          error: (error) => {
            this.addErrorEvent(span, error);
            span.setAttribute('http.status_code', error.status || 500);
            span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
            span.recordException(error);
          },
          finalize: () => span.end(),
        }),
      );
    });
  }

  /**
   * Tambahkan hanya basic attributes untuk request
   */
  private addBasicRequestAttributes(span: Span, request: any): void {
    try {
      span.setAttribute('http.method', request.method);
      span.setAttribute('http.url', request.url);
      span.setAttribute('http.target', request.url);
      span.setAttribute('http.route', request.route?.path || request.url);
      
      // Tambahkan request detail sebagai event dengan flattened structure
      this.addRequestEvent(span, request);
    } catch (error) {
      console.error('Error adding request attributes:', error);
    }
  }

  /**
   * Tambahkan request detail sebagai event dengan flatten structure
   */
  private addRequestEvent(span: Span, request: any): void {
    try {
      const eventAttrs: Attributes = {};
      
      // Flatten body
      if (request.body && Object.keys(request.body).length > 0) {
        const sanitizedBody = this.sanitize(request.body);
        this.flattenToAttributes(sanitizedBody, 'body', eventAttrs, 3);
      }
      
      // Flatten query
      if (request.query && Object.keys(request.query).length > 0) {
        this.flattenToAttributes(request.query, 'query', eventAttrs, 2);
      }
      
      // Flatten params
      if (request.params && Object.keys(request.params).length > 0) {
        this.flattenToAttributes(request.params, 'params', eventAttrs, 2);
      }
      
      if (Object.keys(eventAttrs).length > 0) {
        span.addEvent('http.request', eventAttrs);
      }
    } catch (error) {
      console.error('Error adding request event:', error);
    }
  }

  /**
   * Tambahkan response sebagai event dengan flatten structure
   */
  private addResponseEvent(span: Span, data: any, statusCode: number, duration: number): void {
    try {
      span.setAttribute('http.status_code', statusCode);
      span.setAttribute('http.duration_ms', duration);
      
      if (data) {
        const sanitized = this.sanitize(data);
        const eventAttrs: Attributes = {
          'status_code': statusCode,
          'duration_ms': duration,
        };
        
        // Flatten response body dengan max depth 3
        this.flattenToAttributes(sanitized, 'body', eventAttrs, 3);
        
        span.addEvent('http.response', eventAttrs);
      }
    } catch (error) {
      console.error('Error adding response event:', error);
    }
  }

  /**
   * Tambahkan error sebagai event
   */
  private addErrorEvent(span: Span, error: any): void {
    try {
      const eventAttrs: Attributes = {
        'error.message': error.message,
        'error.name': error.name,
        'error.status': error.status || 500,
      };
      
      if (error.stack) {
        // Truncate stack trace jika terlalu panjang
        const stack = error.stack.substring(0, 2000);
        eventAttrs['error.stack'] = stack;
      }
      
      span.addEvent('http.error', eventAttrs);
    } catch (err) {
      console.error('Error adding error event:', err);
    }
  }

  /**
   * Flatten object menjadi dot notation untuk event attributes
   * Contoh: {user: {name: "John", age: 30}} -> "prefix.user.name": "John", "prefix.user.age": 30
   */
  private flattenToAttributes(
    obj: any,
    prefix: string,
    attrs: Attributes,
    maxDepth: number = 3,
    currentDepth: number = 0
  ): void {
    if (currentDepth >= maxDepth || !obj || typeof obj !== 'object') {
      return;
    }

    for (const key in obj) {
      if (!obj.hasOwnProperty(key)) continue;

      const fullKey = `${prefix}.${key}`;
      const value = obj[key];

      if (value === null || value === undefined) {
        attrs[fullKey] = String(value);
      } else if (value instanceof Date) {
        // Handle Date objects
        attrs[fullKey] = value.toISOString();
      } else if (Array.isArray(value)) {
        // Simpan array sebagai JSON string dan length
        attrs[fullKey] = JSON.stringify(value);
        attrs[`${fullKey}.length`] = value.length;
      } else if (typeof value === 'object') {
        // Recursive flatten untuk nested objects
        this.flattenToAttributes(value, fullKey, attrs, maxDepth, currentDepth + 1);
      } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        // Primitive values
        attrs[fullKey] = value;
      } else {
        // Fallback untuk tipe lain
        attrs[fullKey] = String(value);
      }
    }
  }

  /**
   * Sanitize sensitive data
   */
  private sanitize(data: any): any {
    if (!data) return data;
    
    // Handle primitives
    if (typeof data !== 'object') return data;
    
    // Handle Date objects
    if (data instanceof Date) {
      return data.toISOString();
    }
    
    // Handle Arrays
    if (Array.isArray(data)) {
      return data.map(item => this.sanitize(item));
    }
    
    // Handle plain objects
    const sanitized: any = {};
    const sensitive = ['password', 'token', 'secret', 'apikey', 'authorization', 'pwd'];
    
    for (const key in data) {
      if (!data.hasOwnProperty(key)) continue;
      
      // Redact sensitive fields
      if (sensitive.some(s => key.toLowerCase().includes(s))) {
        sanitized[key] = '***REDACTED***';
      } 
      // Handle Date objects
      else if (data[key] instanceof Date) {
        sanitized[key] = data[key].toISOString();
      }
      // Recursively sanitize nested objects
      else if (data[key] !== null && typeof data[key] === 'object') {
        sanitized[key] = this.sanitize(data[key]);
      }
      // Copy primitive values
      else {
        sanitized[key] = data[key];
      }
    }
    
    return sanitized;
  }
}