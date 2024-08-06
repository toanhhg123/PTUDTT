import BaseApi from '@/base/api';
import { AxiosResponse } from 'axios';

import { type Report } from '@/types/report';

class ReportApi extends BaseApi<never, never, never> {
  constructor() {
    super('statistics');
  }

  get(): Promise<AxiosResponse<Report>> {
    return this.api.get(`${this.url}/report`);
  }
}

export const reportApi = new ReportApi();
