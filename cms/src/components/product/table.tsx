'use client';

import React from 'react';
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

import { type Product } from '@/types/product';

import TableActions from '../core/table-action';

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

export default TableProduct;
