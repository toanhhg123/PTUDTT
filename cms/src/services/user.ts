import BaseApi from '@/base/api';

import { type UserModel } from '@/types/user';
import { type UserForm } from '@/components/user/form-schema';

class UserApi extends BaseApi<UserModel, UserForm, UserForm> {
  constructor() {
    super('user');
  }
}

export const userApi = new UserApi();
