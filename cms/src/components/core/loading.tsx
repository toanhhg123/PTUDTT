import React from 'react';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';

function Loading(): React.ReactNode {
  return (
    <Box display="flex" justifyContent="center">
      <CircularProgress />
    </Box>
  );
}

export default Loading;
