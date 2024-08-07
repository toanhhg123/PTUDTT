'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass } from '@phosphor-icons/react';

interface PropsTypes {
  onSearch?: (value: string) => void;
}

export function SearchFilter({ onSearch }: PropsTypes): React.JSX.Element {
  return (
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        defaultValue=""
        fullWidth
        placeholder="Search"
        onChange={(e) => {
          onSearch && onSearch(e.target.value);
        }}
        startAdornment={
          <InputAdornment position="start">
            <MagnifyingGlass fontSize="var(--icon-fontSize-md)" />
          </InputAdornment>
        }
        sx={{ maxWidth: '500px' }}
      />
    </Card>
  );
}
