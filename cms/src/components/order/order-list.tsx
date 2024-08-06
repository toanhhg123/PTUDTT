'use client';

import React from 'react';
import { orderApi } from '@/services/order';
import { Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import Loading from '../core/loading';
import { SearchFilter } from '../core/search';
import TableOrder from './table';

function OrderList(): React.ReactNode {
  const { data, isPending } = useQuery({
    queryFn: () => orderApi.gets(),
    queryKey: [orderApi.url],
  });

  const orders = data?.data.data || [];
  if (isPending) return <Loading />;

  return (
    <Stack spacing={4}>
      <SearchFilter />
      <TableOrder rows={orders} />
    </Stack>
  );
}

export default OrderList;
