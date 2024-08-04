'use client';

import React, { useState } from 'react';
import { categoryApi } from '@/services/category';
import { Button, Card, CardContent, CardHeader, Divider, Modal } from '@mui/material';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { showToastError, showToastSuccess } from '@/config';

import FormCategory from './form';
import { initCategory, type CategoryForm } from './form-schema';

function Create(): React.ReactNode {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (category: CategoryForm) => categoryApi.post(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [categoryApi.url] });
      toggleOpen();
      showToastSuccess('create');
    },
    onError: showToastError,
  });

  const toggleOpen = (): void => {
    setOpen(!open);
  };

  const handleSubmit = (_value: CategoryForm): void => {
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
            <FormCategory
              defaultValues={initCategory}
              onSubmit={handleSubmit}
              loading={mutation.status === 'pending'}
            />
          </CardContent>
        </Card>
      </Modal>
    </>
  );
}

export default Create;
