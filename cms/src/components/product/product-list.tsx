'use client';

import React, { useState } from 'react';
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

  let products = data?.data.data || [];

  const [search, setSearch] = useState('');
  if (search) {
    products = products.filter((p) => p.productName.toLowerCase().includes(search.toLowerCase()));
  }

  if (isPending) return <Loading />;
  return (
    <Stack spacing={4}>
      <SearchFilter onSearch={setSearch} />
      <TableProduct rows={products} />
    </Stack>
  );
}

export default ProductList;
