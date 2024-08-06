'use client';

import React from 'react';
import { reportApi } from '@/services/report';
import Grid from '@mui/system/Unstable_Grid';
import { useQuery } from '@tanstack/react-query';

import { formatNumber } from '@/config';
import Loading from '@/components/core/loading';

import { Budget } from './budget';
import { TasksProgress } from './tasks-progress';
import { TotalCustomers } from './total-customers';
import { TotalProfit } from './total-profit';

function SalesStatistic(): React.ReactNode {
  const { data, isPending } = useQuery({
    queryFn: () => reportApi.get(),
    queryKey: [reportApi.url],
  });

  const report = data?.data;

  if (isPending || !report) return <Loading />;

  return (
    <>
      <Grid lg={3} sm={6} xs={12}>
        <Budget diff={12} trend="up" sx={{ height: '100%' }} value={`$${formatNumber(report.totalProductValue)}`} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalCustomers diff={16} trend="down" sx={{ height: '100%' }} value={formatNumber(report.totalUserCount)} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TasksProgress sx={{ height: '100%' }} value={Math.ceil(report.soldProductPercentage)} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalProfit sx={{ height: '100%' }} value={`$${formatNumber(report.totalOrderRevenue)}`} />
      </Grid>
    </>
  );
}

export default SalesStatistic;
