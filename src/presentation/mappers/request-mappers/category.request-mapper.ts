import { CreateCategortRequestDTO } from '@presentation/dtos/request/category/create-category.request-dto';

export class CategoryRequestMapper {
  static createCategory(props: { body: CreateCategortRequestDTO }) {
    return {
      name: props.body.name,
      description: props.body.description,
    };
  }
}
