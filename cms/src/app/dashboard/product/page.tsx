import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';

import { config } from '@/config';
import Create from '@/components/product/create';
import ProductList from '@/components/product/product-list';
import Export from '@/components/user/export';

export const metadata = { title: `Products | Dashboard | ${config.site.name}` } satisfies Metadata;

function ProductPage(): React.ReactNode {
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Products</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Export type="product" />
          </Stack>
        </Stack>
        <div>
          <Create />
        </div>
      </Stack>
      <ProductList />
    </Stack>
  );
}

export default ProductPage;
