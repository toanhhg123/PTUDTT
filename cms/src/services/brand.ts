import BaseApi from '@/base/api';

import { type Brand } from '@/types/brand';
import { type BrandForm } from '@/components/brand/form-schema';

class BrandApi extends BaseApi<Brand, BrandForm, BrandForm> {
  constructor() {
    super('brand');
  }
}

export const brandApi = new BrandApi();
