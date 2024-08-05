'use client';

import React from 'react';
import { Box } from '@mui/material';
import { type BoxTypeMap } from '@mui/system';
import { CldUploadWidget } from 'next-cloudinary';

type BoxTypes = BoxTypeMap['props'];

interface PropsType extends BoxTypes {
  onUploadSuccess: (url: string) => void;
  children: React.ReactNode;
}

function UploadButton({ onUploadSuccess, children, ...boxTypes }: PropsType): React.ReactNode {
  return (
    <CldUploadWidget
      uploadPreset="upload"
      onSuccess={(result) => {
        if (!result.info) return;

        if (typeof result.info === 'string') {
          onUploadSuccess(result.info);
          return;
        }

        onUploadSuccess(result.info.secure_url);
      }}
    >
      {({ open }) => {
        return (
          <Box
            {...boxTypes}
            onClick={() => {
              open();
            }}
          >
            {children}
          </Box>
        );
      }}
    </CldUploadWidget>
  );
}

export default UploadButton;
