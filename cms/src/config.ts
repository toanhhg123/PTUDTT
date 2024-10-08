import { AxiosError } from 'axios';
import FileSaver from 'file-saver';
import moment from 'moment';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';

import { getSiteURL } from '@/lib/get-site-url';
import { LogLevel } from '@/lib/logger';

import { type AxiosErrorResponse } from './base/axios';

export interface Config {
  site: { name: string; description: string; themeColor: string; url: string };
  logLevel: keyof typeof LogLevel;
}

export const config: Config = {
  site: { name: 'Devias Kit', description: '', themeColor: '#090a0b', url: getSiteURL() },
  logLevel: (process.env.NEXT_PUBLIC_LOG_LEVEL as keyof typeof LogLevel) ?? LogLevel.ALL,
};

export const serverConfig = {
  API_URL: process.env.URL_API!,
};

export const clientConfig = {
  URL_API: process.env.NEXT_PUBLIC_URL_API!,
};

console.log({ clientConfig });

export const showToastSuccess = (type: 'create' | 'update' | 'delete'): void => {
  toast.success(`${type} success`);
};

export const showToastError = (error: Error): void => {
  if (error instanceof AxiosError && error.response?.data) {
    const response = error.response.data as AxiosErrorResponse;
    toast.error(response.error || JSON.stringify(error.response.data || error.message));
  }
};

export const formatDate = (date: string): string => {
  try {
    return moment(date).format('YYYY-MM-DD');
  } catch (error) {
    return '-';
  }
};

export const statusOrder = ['Chờ giao hàng', 'Đang giao', 'Sắp nhận dc hàng', 'Đã giao thành công'];

export const formatNumber = (num: number): string => {
  const absNum = Math.abs(num);

  if (absNum >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`;
  if (absNum >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (absNum >= 1_000) return `${(num / 1_000).toFixed(1)}K`;

  return num.toString();
};

export function exportToExcel(data: Record<string, string>[], fileName: string): void {
  try {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });

    FileSaver.saveAs(dataBlob, `${fileName}.xlsx`);
  } catch (error) {
    console.log(error);
  }
}
