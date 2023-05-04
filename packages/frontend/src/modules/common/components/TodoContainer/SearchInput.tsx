import React from 'react';
import { TextField } from '@mui/material';

interface IProps {
  searchQuery: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput = ({ searchQuery, handleSearchChange }: IProps) => (
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
