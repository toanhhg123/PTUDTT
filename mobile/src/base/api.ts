import { axiosClient, type AxiosResponseApi } from "./axios";
import { type BaseURL } from "./base-url";
import { type BaseModel } from "./model";

export default class BaseApi<TGet extends BaseModel, TPost, TPatch> {
  readonly url: BaseURL;
  readonly api = axiosClient;

  constructor(url: BaseURL) {
    this.url = url;
  }

  gets(): Promise<AxiosResponseApi<TGet[]>> {
    return axiosClient.get(this.url);
  }

  get(id: number): Promise<AxiosResponseApi<TGet>> {
    return axiosClient.get(this.url + `/${id}`);
  }

  post(body: TPost): Promise<AxiosResponseApi<TGet>> {
    return axiosClient.post(this.url, body);
  }

  update(id: number, body: TPatch): Promise<AxiosResponseApi<TGet>> {
    return axiosClient.put(`${this.url}/${id}`, body);
  }

  delete(id: number): Promise<AxiosResponseApi<TGet>> {
    return axiosClient.delete(`${this.url}/${id}`);
  }
}
