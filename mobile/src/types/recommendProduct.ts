import { BaseModel } from "../base/model";
import { Product } from "./product";

export interface RecommendProduct extends BaseModel {
  currentProductId: number;
  recommentProductId: number;
  recommendProduct: Product;
}
