'use client';

import React from 'react';
import { productApi } from '@/services/product';
import { Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import Loading from '../core/loading';
import { SearchFilter } from '../core/search';
import TableProduct from './table';

function ProductList(): React.ReactNode {
  const { data, isPending } = useQuery({
    queryFn: () => productApi.gets(),
    queryKey: [productApi.url],
  });

  const products = data?.data.data || [];
  if (isPending) return <Loading />;

  return (
    <Stack spacing={4}>
      <SearchFilter />
      <TableProduct rows={products} />
    </Stack>
  );
}

export default ProductList;
