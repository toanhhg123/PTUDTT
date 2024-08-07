import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';

import { config } from '@/config';
import Create from '@/components/user/create';
import Export from '@/components/user/export';
import UserList from '@/components/user/list';

export const metadata = { title: `User | Dashboard | ${config.site.name}` } satisfies Metadata;

function UserPage(): React.ReactNode {
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">User</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Export type="user" />
          </Stack>
        </Stack>
        <div>
          <Create />
        </div>
      </Stack>
      <UserList />
    </Stack>
  );
}

export default UserPage;
