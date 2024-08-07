import BaseApi from "../base/api";
import { AxiosResponseApi } from "../base/axios";
import { Order } from "../types/order";

class OrderApi extends BaseApi<Order, never, never> {
  constructor() {
    super("order");
  }

  createOrderSuccess(userId: number) {
    const url = this.url + `/placeorder`;
    return this.api.post(url, { userId });
  }

  getByUserId(userId: number): Promise<AxiosResponseApi<Order[]>> {
    return this.api.get(`${this.url}/order/${userId}`);
  }
}

export const orderApi = new OrderApi();
