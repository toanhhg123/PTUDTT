'use client';

import React, { useState } from 'react';
import { productApi } from '@/services/product';
import { Button, Card, CardContent, CardHeader, Divider, Modal } from '@mui/material';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { showToastError, showToastSuccess } from '@/config';

import FormProduct from './form';
import { initProduct, type ProductForm } from './form-schema';

function Create(): React.ReactNode {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (product: ProductForm) => productApi.post(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [productApi.url] });
      toggleOpen();
      showToastSuccess('create');
    },
    onError: showToastError,
  });

  const toggleOpen = (): void => {
    setOpen(!open);
  };

  const handleSubmit = (_value: ProductForm): void => {
    mutation.mutate(_value);
  };

  return (
    <>
      <Button onClick={toggleOpen} startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
        Add
      </Button>
      <Modal open={open} onClose={toggleOpen}>
        <Card sx={{ width: 600, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute' }}>
          <CardHeader subheader="The information can be edited" title="Create Product" />
          <Divider />

          <CardContent>
            <FormProduct defaultValues={initProduct} onSubmit={handleSubmit} loading={mutation.status === 'pending'} />
          </CardContent>
        </Card>
      </Modal>
    </>
  );
}

export default Create;
