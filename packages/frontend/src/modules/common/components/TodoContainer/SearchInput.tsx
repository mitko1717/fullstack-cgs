import React from 'react';
import { TextField } from '@mui/material';
import { ISearchInputProps } from '../../types/TodoContainerComponents.types';

export const SearchInput = ({ searchQuery, handleSearchChange }: ISearchInputProps) => (
  <TextField
    id="outlined-basic"
    size="medium"
    color="primary"
    label="at least 3 characters to search by text"
    variant="outlined"
    value={searchQuery}
    onChange={handleSearchChange}
    fullWidth
  />
);
