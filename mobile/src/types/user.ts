import { BaseModel } from "../base/model";

export interface User {
  id: string;
  name?: string;
  avatar?: string;
  email?: string;

  [key: string]: unknown;
}

export interface UserModel extends BaseModel {
  name: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  role: EnumRole;
  isActive: boolean;
}

export enum EnumRole {
  Admin = "Admin",
  User = "User",
}

export interface UserToken {
  unique_name: string;
  role: string;
  id: string;
}

export interface UserRegister {
  name: string;
  username: string;
  password: string;
  email: string;
  phone: string;
}
