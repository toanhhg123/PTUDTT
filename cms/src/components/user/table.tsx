'use client';

import React, { useState } from 'react';
import { userApi } from '@/services/user';
import { CardContent, CardHeader, Chip, Modal } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { EnumRole, type UserModel } from '@/types/user';
import { showToastError, showToastSuccess } from '@/config';

import ConfirmDialog from '../core/confirm-dialog';
import TableActions from '../core/table-action';
import FormUser from './form';
import { type UserForm } from './form-schema';

interface PropsType {
  rows: UserModel[];
}

function TableUser({ rows = [] }: PropsType): React.ReactNode {
  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>
                    {row.role === EnumRole.Admin ? (
                      <Chip label="Admin" color="primary" />
                    ) : (
                      <Chip label="User" color="success" />
                    )}
                  </TableCell>
                  <TableCell>
                    {row.isActive ? (
                      <Chip label="Active" color="success" variant="outlined" />
                    ) : (
                      <Chip label="Disable" color="error" variant="outlined" />
                    )}
                  </TableCell>
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
  row: UserModel;
}

function ColumAction({ row }: ColumActionProps): React.ReactNode {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (body: { id: number } & UserForm) => userApi.update(body.id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [userApi.url] });
      setOpenUpdate(false);
      showToastSuccess('update');
    },
    onError: showToastError,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => userApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [userApi.url] });
      setOpenDelete(false);
      showToastSuccess('delete');
    },
    onError: showToastError,
  });

  const handleDelete = (): void => {
    deleteMutation.mutate(row.id);
  };

  const handleSubmit = (_value: UserForm): void => {
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
          <CardHeader subheader="The information can be edited" title="Update User" />
          <Divider />

          <CardContent>
            <FormUser defaultValues={row} onSubmit={handleSubmit} loading={updateMutation.status === 'pending'} />
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

export default TableUser;
