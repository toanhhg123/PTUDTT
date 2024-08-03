'use client';

import React from 'react';
import { userApi } from '@/services/user';
import { Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import Loading from '../core/loading';
import { SearchFilter } from '../core/search';
import TableUser from './table';

export default function UserList(): React.ReactNode {
  const { data, isPending } = useQuery({
    queryFn: () => userApi.gets(),
    queryKey: [userApi.url],
  });

  const users = data?.data.data || [];
  if (isPending) return <Loading />;

  return (
    <Stack spacing={4}>
      <SearchFilter />
      <TableUser rows={users} />
    </Stack>
  );
}
