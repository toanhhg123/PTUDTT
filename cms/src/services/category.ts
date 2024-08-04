import BaseApi from '@/base/api';

import { type Category } from '@/types/Category';
import { type CategoryForm } from '@/components/category/form-schema';

class CategoryApi extends BaseApi<Category, CategoryForm, CategoryForm> {
  constructor() {
    super('category');
  }
}

export const categoryApi = new CategoryApi();
