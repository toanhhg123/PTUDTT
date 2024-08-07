'use client';

import React, { useState } from 'react';
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

  let brands = data?.data.data || [];

  const [search, setSearch] = useState('');
  if (search) {
    brands = brands.filter((c) => c?.name.toLowerCase().includes(search.toLowerCase()));
  }
  if (isPending) return <Loading />;

  return (
    <Stack spacing={4}>
      <SearchFilter onSearch={setSearch} />
      <TableBrand rows={brands} />
    </Stack>
  );
}
