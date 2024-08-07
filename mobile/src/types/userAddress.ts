import { BaseModel } from "../base/model";

export interface UserAddress extends BaseModel {
  userId: number;
  address: string | null;
  city: string | null;
  district: string | null;
  ward: string | null;
  country: string | null;
  postalCode?: string | null;
}

export type UserAddressRequest = {
  userId: number;
  address: string;
  city: string;
  district: string;
  ward: string;
  country: string;
  postalCode?: string;
};
