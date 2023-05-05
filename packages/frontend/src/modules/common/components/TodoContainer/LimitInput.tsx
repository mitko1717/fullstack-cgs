import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { ILimitInputBoxProps } from '../../types/TodoContainerComponents.types';

export const LimitInputBox = ({ limitInput, handleLimitChange, setLimit }: ILimitInputBoxProps) => (
  <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center' }} my={2} mx={1}>
    <TextField
      id="filled-number"
      label="limit"
      type="number"
      value={limitInput}
      InputLabelProps={{
        shrink: true
      }}
      variant="filled"
      onChange={handleLimitChange}
    />
    <Button variant="contained" onClick={() => setLimit(limitInput)}>
      Set
    </Button>
  </Box>
);
