import { BaseModel } from "../base/model";
import { Product } from "./product";

export interface Order extends BaseModel {
  userId: number;
  totalPrice: number;
  orderDate: string;
  deliveryDate: string;
  note: string;
  status: string;

  orderDetails: OrderDetails[];
}

interface OrderDetails {
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  product: Product;
}
