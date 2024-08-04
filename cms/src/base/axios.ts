import axios, { type AxiosError, type AxiosResponse } from 'axios';

import { clientConfig } from '@/config';

const axiosClient = axios.create({
  baseURL: clientConfig.URL_API,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('asdjkhsajhdaks');
    if (token) config.headers.Authorization = `Bearer ${token}`;

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

export { axiosClient, type ResponseApi, type AxiosResponseApi, type AxiosErrorResponse };
