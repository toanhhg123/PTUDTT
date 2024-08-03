import BaseApi from '@/base/api';

import { type UserModel } from '@/types/user';

class UserApi extends BaseApi<UserModel, UserModel, UserModel> {
  constructor() {
    super('user');
  }
}

export const userApi = new UserApi();
