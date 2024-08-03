import * as React from 'react';
import { IconButton, MenuItem, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import Popover from '@mui/material/Popover';
import { DotsThreeVertical, PenNib, Trash } from '@phosphor-icons/react';

interface PropsType {
  onDelete?: () => void;
  onUpdate?: () => void;
}

export default function TableActions({ onDelete, onUpdate }: PropsType): React.ReactNode {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton onClick={handleClick}>
        <DotsThreeVertical />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MenuItem sx={{ display: 'flex', gap: 2 }} onClick={onUpdate}>
          <PenNib /> <Typography>Edit</Typography>
        </MenuItem>

        <MenuItem sx={{ display: 'flex', gap: 2 }} onClick={onDelete}>
          <Trash color={red[500]} /> <Typography color={red[500]}> Delete</Typography>
        </MenuItem>
      </Popover>
    </div>
  );
}
