import { type BaseModel } from '@/base/model';

import { type Product } from './product';
import { type UserModel } from './user';

export interface Order extends BaseModel {
  userId: number;
  totalPrice: number;
  orderDate: string;
  deliveryDate: string;
  note: string;
  status: string;
  user: UserModel;
  orderDetails: OrderDetails[];
}

interface OrderDetails {
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  product: Product;
}
