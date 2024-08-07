'use client';

import React, { useState } from 'react';
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

  let users = data?.data.data || [];

  const [search, setSearch] = useState('');

  if (search) {
    users = users.filter((c) => c?.username.toLowerCase().includes(search.toLowerCase()));
  }

  if (isPending) return <Loading />;

  return (
    <Stack spacing={4}>
      <SearchFilter onSearch={setSearch} />
      <TableUser rows={users} />
    </Stack>
  );
}
