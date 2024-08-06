import BaseApi from '@/base/api';
import { type AxiosResponseApi } from '@/base/axios';

import { type Order } from '@/types/order';

class OrderApi extends BaseApi<Order, Order, Order> {
  constructor() {
    super('order');
  }

  changeStatus(id: number, status: number): Promise<AxiosResponseApi<Order>> {
    return this.api.patch(`${this.url}/${id}/status/${status}`);
  }
}

export const orderApi = new OrderApi();
