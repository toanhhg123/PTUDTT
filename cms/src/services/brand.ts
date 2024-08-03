import BaseApi from '@/base/api';

import { type Brand } from '@/types/brand';

class BrandApi extends BaseApi<Brand, Brand, Brand> {
  constructor() {
    super('brand');
  }
}

export const brandApi = new BrandApi();
