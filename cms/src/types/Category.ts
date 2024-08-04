import { type BaseModel } from '@/base/model';

export interface Category extends BaseModel {
  name: string;
  note: string | null;
}
