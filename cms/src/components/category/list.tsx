'use client';

import React, { useState } from 'react';
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

  let categories = data?.data.data || [];

  const [search, setSearch] = useState('');
  if (search) {
    categories = categories.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
  }

  if (isPending) return <Loading />;

  return (
    <Stack spacing={4}>
      <SearchFilter onSearch={setSearch} />
      <TableCategory rows={categories} />
    </Stack>
  );
}
