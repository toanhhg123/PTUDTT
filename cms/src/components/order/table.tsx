'use client';

import React, { useState } from 'react';
import { orderApi } from '@/services/order';
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  AvatarGroup,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type Order } from '@/types/order';
import { formatDate, showToastError, showToastSuccess, statusOrder } from '@/config';

import ConfirmDialog from '../core/confirm-dialog';
import TableActions from '../core/table-action';

interface PropsType {
  rows: Order[];
}

function TableOrder({ rows = [] }: PropsType): React.ReactNode {
  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Products</TableCell>
              <TableCell>Information</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover key={row.id}>
                  <TableCell>
                    <AvatarGroup total={row.orderDetails.length}>
                      {row.orderDetails.map((o, i) => (
                        <Avatar key={o.orderId.toString() + i.toString()} alt="Remy Sharp" src={o.product.image} />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell>
                    {row.user.name}, {row.user.email}
                  </TableCell>
                  <TableCell>{row.totalPrice}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell> {row.orderDate ? formatDate(row.orderDate) : '-'}</TableCell>
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
  row: Order;
}

function ColumAction({ row }: ColumActionProps): React.ReactNode {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [status, setStatus] = useState(row.status || statusOrder[0]);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: number) => orderApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [orderApi.url] });
      setOpenDelete(false);
      showToastSuccess('delete');
    },
    onError: showToastError,
  });

  const updateStatus = useMutation({
    mutationFn: (body: { status: number; id: number }) => orderApi.changeStatus(body.id, body.status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [orderApi.url] });
      setOpenUpdate(false);
      showToastSuccess('update');
    },
    onError: showToastError,
  });

  const handleDelete = (): void => {
    deleteMutation.mutate(row.id);
  };

  const handleChangeStatus = (): void => {
    const index = statusOrder.findIndex((item) => item === status);
    if (index === -1) return;

    updateStatus.mutate({ id: row.id, status: index });
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
          <CardHeader subheader="The information can be edited" title="Update Order" />
          <Divider />

          <CardContent>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                value={status}
                label="Status"
                variant="outlined"
              >
                {statusOrder.map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <LoadingButton
              onClick={handleChangeStatus}
              loading={updateStatus.status === 'pending'}
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
            >
              Save
            </LoadingButton>
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

export default TableOrder;
