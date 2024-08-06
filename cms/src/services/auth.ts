import BaseApi from '@/base/api';
import { type AxiosResponseApi } from '@/base/axios';

import { type UserModel } from '@/types/user';
import { type BrandForm } from '@/components/brand/form-schema';

class AuthApi extends BaseApi<UserModel, BrandForm, BrandForm> {
  constructor() {
    super('auth');
  }

  login(username: string, password: string): Promise<AxiosResponseApi<string>> {
    return this.api.post(`${this.url}/login`, { username, password });
  }
}

export const authApi = new AuthApi();
