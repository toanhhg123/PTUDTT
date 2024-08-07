'use client';

import React from 'react';
import { productApi } from '@/services/product';
import { userApi } from '@/services/user';
import { Button } from '@mui/material';
import { Download } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';

import { exportToExcel } from '@/config';

function Export({ type }: { type: 'user' | 'product' }): React.ReactNode {
  const { data: userData } = useQuery({
    queryFn: () => userApi.gets(),
    queryKey: [userApi.url],
  });

  const users = userData?.data.data || [];

  const { data: productData } = useQuery({
    queryFn: () => productApi.gets(),
    queryKey: [productApi.url],
  });

  const products = productData?.data.data || [];

  const handleExport = (): void => {
    let data: Record<string, string>[] = [];

    switch (type) {
      case 'user':
        data = users.map((item) => _.mapValues(item, (value) => (_.isNull(value) ? '' : String(value))));
        break;

      case 'product':
        data = products.map((item) => _.mapValues(item, (value) => (_.isNull(value) ? '' : String(value))));
        break;
    }
    exportToExcel(data, 'exported_data');
  };
  return (
    <Button onClick={handleExport} color="inherit" startIcon={<Download fontSize="var(--icon-fontSize-md)" />}>
      Export
    </Button>
  );
}

export default Export;
