// product-request.mapper.ts
export class ProductRequestMapper {
  static toAddCategories(props: {
    param: { uid: string },
    body: { categoryUids: string[] }}
  ) {
    return {
      productUid: props.param.uid,
      categoryUids: props.body.categoryUids,
    };
  }
}