import React from 'react';
import { Button } from '@mui/material';
import { ButtonGrid } from './TodoContainer.styled';
import { IButton } from './buttonsData';

interface IProps {
  buttons: IButton[];
  listButton: string;
  privateOrPublic: string;
  handlePrivateOrPublicClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleListClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Buttons = ({
  buttons,
  listButton,
  privateOrPublic,
  handlePrivateOrPublicClick,
  handleListClick
}: IProps) => (
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
