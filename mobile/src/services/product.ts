import BaseApi from "../base/api";
import { Product } from "../types/product";

class ProductApi extends BaseApi<Product, Product, Product> {
  constructor() {
    super("product");
  }
}

export const productApi = new ProductApi();
