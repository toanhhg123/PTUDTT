import React from 'react';
import styled from '@emotion/styled';
import { Box, FormControl, FormHelperText, FormLabel } from '@mui/material';
import { UploadSimple, Warning } from '@phosphor-icons/react';
import { Controller, type FieldValues, type Path, type PathValue, type UseFormReturn } from 'react-hook-form';

import UploadButton from '../core/upload-button';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default VisuallyHiddenInput;

interface PropsType<T extends FieldValues> {
  label?: string;
  form: UseFormReturn<T, unknown>;
  name: Path<T>;
  defaultPreviewImage?: Path<T>;
}

export function FormFieldFile<T extends FieldValues>({
  label,
  form,
  name,
  defaultPreviewImage,
}: PropsType<T>): React.ReactNode {
  const { control } = form;

  return (
    <Controller
      control={control}
      name={name}
      render={({ fieldState }) => {
        const error = fieldState.error?.message;
        const previewFile = form.watch(defaultPreviewImage as Path<T>) as string;

        const handleFileChange = (url: string): void => {
          if (defaultPreviewImage) form.setValue(defaultPreviewImage, url as PathValue<T, Path<T>>);
        };

        return (
          <FormControl fullWidth>
            {label ? <FormLabel sx={{ mb: 1 }}>{label}</FormLabel> : null}
            <UploadButton
              onUploadSuccess={handleFileChange}
              sx={{
                borderColor: 'primary.300',
                cursor: 'pointer',
                padding: '12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '200px',
                position: 'relative',
                border: '1px dashed',
                borderRadius: '10px',
              }}
            >
              {previewFile ? (
                <Box
                  sx={{
                    width: '100%',
                    height: '200px',
                    background: 'red',
                  }}
                >
                  <img
                    srcSet={previewFile}
                    src={previewFile}
                    alt="img"
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '10px',
                    }}
                  />
                </Box>
              ) : (
                <Box position="absolute" zIndex="10">
                  <UploadSimple />
                </Box>
              )}
            </UploadButton>

            {error ? (
              <FormHelperText>
                <Warning />
                {error}
              </FormHelperText>
            ) : null}
          </FormControl>
        );
      }}
    />
  );
}
