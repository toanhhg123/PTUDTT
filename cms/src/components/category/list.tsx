'use client';

import React from 'react';
import { categoryApi } from '@/services/category';
import { Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import Loading from '../core/loading';
import { SearchFilter } from '../core/search';
import TableCategory from './table';

export default function CategoryList(): React.ReactNode {
  const { data, isPending } = useQuery({
    queryFn: () => categoryApi.gets(),
    queryKey: [categoryApi.url],
  });

  const categories = data?.data.data || [];
  if (isPending) return <Loading />;

  return (
    <Stack spacing={4}>
      <SearchFilter />
      <TableCategory rows={categories} />
    </Stack>
  );
}
