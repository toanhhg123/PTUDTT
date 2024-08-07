import BaseApi from "../base/api";
import { AxiosResponseApi } from "../base/axios";
import { UserModel } from "../types/user";
import { UserAddress, UserAddressRequest } from "../types/userAddress";

class UserAddressApi extends BaseApi<
  UserAddress,
  UserAddressRequest,
  UserAddressRequest
> {
  constructor() {
    super("userAddress");
  }

  getByUserId(userId: number): Promise<AxiosResponseApi<UserAddress>> {
    return this.api.get(this.url + `/${userId}`);
  }
}

export const userAddressApi = new UserAddressApi();
