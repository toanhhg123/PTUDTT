'use client';

import React, { useState } from 'react';
import { categoryApi } from '@/services/category';
import { CardContent, CardHeader, Modal } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type Category } from '@/types/Category';
import { showToastError, showToastSuccess } from '@/config';

import ConfirmDialog from '../core/confirm-dialog';
import TableActions from '../core/table-action';
import FormCategory from './form';
import { type CategoryForm } from './form-schema';

interface PropsType {
  rows: Category[];
}

function TableCategory({ rows = [] }: PropsType): React.ReactNode {
  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.note}</TableCell>
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
  row: Category;
}

function ColumAction({ row }: ColumActionProps): React.ReactNode {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (body: { id: number } & CategoryForm) => categoryApi.update(body.id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [categoryApi.url] });
      setOpenUpdate(false);
      showToastSuccess('update');
    },
    onError: showToastError,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => categoryApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [categoryApi.url] });
      setOpenDelete(false);
      showToastSuccess('delete');
    },
    onError: showToastError,
  });

  const handleDelete = (): void => {
    deleteMutation.mutate(row.id);
  };

  const handleSubmit = (_value: CategoryForm): void => {
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
            <FormCategory defaultValues={row} onSubmit={handleSubmit} loading={updateMutation.status === 'pending'} />
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

export default TableCategory;
