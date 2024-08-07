import { BaseModel } from "../base/model";
import { Product } from "./product";

export interface Cart extends BaseModel {
  userId: number;
  productId: number;
  quantity: number;
  product: Product;
}

export interface CartForm {
  userId: number;
  productId: number;
  quantity: number;
}
