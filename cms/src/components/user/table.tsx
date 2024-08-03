'use client';

import React from 'react';
import { Chip } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { EnumRole, type UserModel } from '@/types/user';

import TableActions from '../core/table-action';

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
                    <div>
                      <TableActions />
                    </div>
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

export default TableUser;
