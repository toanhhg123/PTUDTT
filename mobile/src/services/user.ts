import BaseApi from "../base/api";
import { AxiosResponseApi } from "../base/axios";
import { UserModel } from "../types/user";

class UserApi extends BaseApi<UserModel, UserModel, Partial<UserModel>> {
  constructor() {
    super("user");
  }

  getUserById(userId: number): Promise<AxiosResponseApi<UserModel>> {
    return this.api.get(this.url + `/${userId}`);
  }
}

export const userApi = new UserApi();
