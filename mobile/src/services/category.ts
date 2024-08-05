import BaseApi from "../base/api";
import { Category } from "../types/Category";

class CategoryApi extends BaseApi<Category, Category, Category> {
  constructor() {
    super("category");
  }
}

export const categoryApi = new CategoryApi();
