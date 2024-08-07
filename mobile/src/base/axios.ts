import axios, { type AxiosError, type AxiosResponse } from "axios";

const axiosClient = axios.create({
  baseURL: "https://api.chinapost.io.vn",
});

axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (e: AxiosError) => Promise.reject(e)
);

interface ResponseApi<T> {
  data: T;
  error: string;
  message: string;
  status: number;
}

interface AxiosErrorResponse {
  data: null;
  error: string;
  message: string;
  status: number;
}

type AxiosResponseApi<T> = AxiosResponse<ResponseApi<T>>;

export {
  axiosClient,
  type ResponseApi,
  type AxiosResponseApi,
  type AxiosErrorResponse,
};
