export class CreateProductServiceDTO {
  name!: string;
  price!: number;
  stock!: number;
  description?: string | null;
  actor?: string | null;
}
