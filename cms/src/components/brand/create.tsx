'use client';

import React, { useState } from 'react';
import { brandApi } from '@/services/brand';
import { Button, Card, CardContent, CardHeader, Divider, Modal } from '@mui/material';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { showToastError, showToastSuccess } from '@/config';

import FormBrand from './form';
import { initBrand, type BrandForm } from './form-schema';

function Create(): React.ReactNode {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (brand: BrandForm) => brandApi.post(brand),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [brandApi.url] });
      toggleOpen();
      showToastSuccess('create');
    },
    onError: showToastError,
  });

  const toggleOpen = (): void => {
    setOpen(!open);
  };

  const handleSubmit = (_value: BrandForm): void => {
    mutation.mutate(_value);
  };

  return (
    <>
      <Button onClick={toggleOpen} startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
        Add
      </Button>
      <Modal open={open} onClose={toggleOpen}>
        <Card sx={{ width: 600, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute' }}>
          <CardHeader subheader="The information can be edited" title="Create User" />
          <Divider />

          <CardContent>
            <FormBrand defaultValues={initBrand} onSubmit={handleSubmit} loading={mutation.status === 'pending'} />
          </CardContent>
        </Card>
      </Modal>
    </>
  );
}

export default Create;
