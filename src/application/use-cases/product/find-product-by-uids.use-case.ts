import type { ProductPort } from '@application/ports/product.port';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindProductByUidsUseCase {
  constructor(@Inject('ProductPort') private readonly port: ProductPort) {}

  async execute(dto: { uids: string[] }) {
    const doc = await this.port.findByUids(dto.uids);
    return doc;
  }
}
