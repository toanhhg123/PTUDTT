import BaseApi from "../base/api";
import { AxiosResponseApi } from "../base/axios";
import { Product } from "../types/product";
import { RecommendProduct } from "../types/recommendProduct";

class RecommendProductApi extends BaseApi<RecommendProduct, never, never> {
  constructor() {
    super("recomment");
  }

  getByProductId(
    productId: number
  ): Promise<AxiosResponseApi<RecommendProduct[]>> {
    return this.api.get(this.url + `/${productId}`);
  }
}

export const recommendProductApi = new RecommendProductApi();
