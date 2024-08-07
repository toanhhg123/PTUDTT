import BaseApi from "../base/api";
import { AxiosResponseApi } from "../base/axios";
import { Cart, CartForm } from "../types/cart";

class CartApi extends BaseApi<Cart, CartForm, Partial<CartForm>> {
  constructor() {
    super("cart");
  }

  getsByUserId(userId: number): Promise<AxiosResponseApi<Cart[]>> {
    return this.api.get(this.url + `/user/${userId}`);
  }
}

export const cartApi = new CartApi();
