import { BaseModel } from "../base/model";

export interface Brand extends BaseModel {
  name: string;
  note: string | null;
}
