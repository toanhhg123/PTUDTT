export interface PaymentIntent {
  paymentIntent: string;
  customer: string;
  ephemeralKey: string;
}

export interface PaymentCreation {
  userId: string;
  price: number;
}
