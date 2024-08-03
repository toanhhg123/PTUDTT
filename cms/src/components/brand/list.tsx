'use client';

import React from 'react';
import { brandApi } from '@/services/brand';
import { Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import Loading from '../core/loading';
import { SearchFilter } from '../core/search';
import TableBrand from './table';

export default function BranchList(): React.ReactNode {
  const { data, isPending } = useQuery({
    queryFn: () => brandApi.gets(),
    queryKey: [brandApi.url],
  });

  const brands = data?.data.data || [];
  if (isPending) return <Loading />;

  return (
    <Stack spacing={4}>
      <SearchFilter />
      <TableBrand rows={brands} />
    </Stack>
  );
}
