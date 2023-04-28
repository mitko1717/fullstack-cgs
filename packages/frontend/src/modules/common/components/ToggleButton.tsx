import React from 'react';
import styled from 'styled-components';

interface IToggleButton {
  toggled: boolean;
}

interface ButtonProps {
  toggled?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  height: 40px;
  min-width: 50px;
  background-color: ${(props) => (props.toggled ? 'green' : 'white')};
  color: ${(props) => (props.toggled ? 'white' : 'green')};
  border: 1px solid green;
  padding: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: ${(props) => (props.toggled ? 'white' : 'green')};
    color: ${(props) => (props.toggled ? 'green' : 'white')};
    border-color: white;
  }
`;

const ToggleButton = ({ toggled }: IToggleButton) => (
  <StyledButton toggled={toggled}>{toggled ? 'completed' : 'uncompleted'}</StyledButton>
);

export default ToggleButton;
