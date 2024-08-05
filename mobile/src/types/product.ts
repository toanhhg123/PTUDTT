import { BaseModel } from "../base/model";

export interface Product extends BaseModel {
  productName: string;
  desc: string;
  stock: number;
  purchasePrice: number;
  sellPrice: number;
  image: string;
  categoryId: number;
  brandId: number;
}
