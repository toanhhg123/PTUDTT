import BaseApi from '@/base/api';

import { type Product } from '@/types/product';
import { type ProductForm } from '@/components/product/form-schema';

class ProductApi extends BaseApi<Product, ProductForm, ProductForm> {
  constructor() {
    super('product');
  }
}

export const productApi = new ProductApi();
