import type { ProductPort } from '@application/ports/product.port';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindProductByUidUseCase {
  constructor(
    @Inject('ProductPort') private readonly port: ProductPort,
  ) {}

  async execute(dto: { uid: string }) {
    const doc = await this.port.findByUid(dto.uid);
    if (!doc) throw new Error();
    return doc;
  }
}
