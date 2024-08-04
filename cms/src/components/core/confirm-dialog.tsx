import React from 'react';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  styled,
  Typography,
} from '@mui/material';
import { WarningCircle, X } from '@phosphor-icons/react';

const WarningDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogTitle-root': {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
}));

const WarningIconStyled = styled(WarningCircle)(({ theme }) => ({
  fontSize: '3rem',
  color: theme.palette.error.main,
  marginRight: theme.spacing(2),
}));

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}

function ConfirmDialog({ open, title, message, onConfirm, onCancel, loading }: ConfirmDialogProps): React.ReactNode {
  return (
    <WarningDialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" component="div" style={{ display: 'flex', alignItems: 'center' }}>
          {title}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onCancel}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.error.contrastText,
          }}
        >
          <X />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
          <WarningIconStyled />
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary" variant="outlined">
          Cancel
        </Button>
        <LoadingButton loading={loading} onClick={onConfirm} color="error" variant="contained">
          Confirm
        </LoadingButton>
      </DialogActions>
    </WarningDialog>
  );
}

export default ConfirmDialog;
