import BaseApi from "../base/api";
import { AxiosResponseApi } from "../base/axios";
import { PaymentCreation, PaymentIntent } from "../types/payment";

class PaymentApi extends BaseApi<never, never, never> {
  constructor() {
    super("payment");
  }

  createPayment(
    request: PaymentCreation
  ): Promise<AxiosResponseApi<PaymentIntent>> {
    return this.api.post(this.url + "/create-payment-intent", request);
  }
}

export const paymentApi = new PaymentApi();
