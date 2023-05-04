import React from 'react';
import { Button } from '@mui/material';
import { ButtonGrid } from './TodoContainer.styled';
import { IButtonsProps } from '../../types/TodoContainerComponents.types';

export const Buttons = ({
  buttons,
  listButton,
  privateOrPublic,
  handlePrivateOrPublicClick,
  handleListClick
}: IButtonsProps) => (
  <ButtonGrid container sx={{ my: 2 }}>
    {buttons.map((b) => (
      <Button
        key={b.title}
        onClick={b.type === 'status' ? handlePrivateOrPublicClick : handleListClick}
        name={b.name}
        value={b.value}
        variant={listButton === b.value || privateOrPublic === b.value ? 'contained' : 'outlined'}
        style={{
          color: listButton === b.value || privateOrPublic === b.value ? 'primary' : 'default'
        }}
      >
        {b.title}
      </Button>
    ))}
  </ButtonGrid>
);
