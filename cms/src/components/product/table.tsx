'use client';

import React, { useState } from 'react';
import { productApi } from '@/services/product';
import { CardContent, CardHeader, Modal } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type Product } from '@/types/product';
import { showToastError, showToastSuccess } from '@/config';

import ConfirmDialog from '../core/confirm-dialog';
import TableActions from '../core/table-action';
import FormProduct from './form';
import { type ProductForm } from './form-schema';

interface PropsType {
  rows: Product[];
}

function TableProduct({ rows = [] }: PropsType): React.ReactNode {
  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>purchasePrice/Sell</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover key={row.id}>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Avatar src={row.image} />
                      <Typography variant="subtitle2">{row.productName}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {row.purchasePrice}, {row.sellPrice}
                  </TableCell>
                  <TableCell>{row.stock}</TableCell>
                  <TableCell>{row.categoryId}</TableCell>
                  <TableCell>{row.brandId}</TableCell>
                  <TableCell>
                    <ColumAction row={row} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
    </Card>
  );
}

interface ColumActionProps {
  row: Product;
}

function ColumAction({ row }: ColumActionProps): React.ReactNode {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (body: { id: number } & ProductForm) => productApi.update(body.id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [productApi.url] });
      setOpenUpdate(false);
      showToastSuccess('update');
    },
    onError: showToastError,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => productApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [productApi.url] });
      setOpenDelete(false);
      showToastSuccess('delete');
    },
    onError: showToastError,
  });

  const handleDelete = (): void => {
    deleteMutation.mutate(row.id);
  };

  const handleSubmit = (_value: ProductForm): void => {
    updateMutation.mutate({ ..._value, id: row.id });
  };

  return (
    <div>
      <TableActions
        onDelete={() => {
          setOpenDelete(true);
        }}
        onUpdate={() => {
          setOpenUpdate(true);
        }}
      />

      <Modal
        open={openUpdate}
        onClose={() => {
          setOpenUpdate(false);
        }}
      >
        <Card sx={{ width: 600, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute' }}>
          <CardHeader subheader="The information can be edited" title="Update Category" />
          <Divider />

          <CardContent>
            <FormProduct defaultValues={row} onSubmit={handleSubmit} loading={updateMutation.status === 'pending'} />
          </CardContent>
        </Card>
      </Modal>

      <ConfirmDialog
        title="Warning"
        message="Do you want delete item ?"
        onCancel={() => {
          setOpenDelete(false);
        }}
        open={openDelete}
        onConfirm={handleDelete}
        loading={deleteMutation.status === 'pending'}
      />
    </div>
  );
}

export default TableProduct;
