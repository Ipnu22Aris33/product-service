export class CreateProductUseCaseDTO {
  name!: string;
  price!: number;
  stock!: number;
  description?: string | null;
}
