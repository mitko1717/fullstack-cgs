import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../theme/colors.const';

interface IToggleButton {
  toggled: boolean;
}

interface ButtonProps {
  toggled?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  height: 40px;
  min-width: 50px;
  background-color: ${(props) => (props.toggled ? `${COLORS.green}` : `${COLORS.white}`)};
  color: ${(props) => (props.toggled ? `${COLORS.white}` : `${COLORS.green}`)};
  border: 1px solid ${COLORS.green};
  padding: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: ${(props) => (props.toggled ? `${COLORS.white}` : `${COLORS.green}`)};
    color: ${(props) => (props.toggled ? `${COLORS.green}` : `${COLORS.white}`)};
    border-color: ${COLORS.white};
  }
`;

const ToggleButton = ({ toggled }: IToggleButton) => (
  <StyledButton toggled={toggled}>{toggled ? 'completed' : 'uncompleted'}</StyledButton>
);

export default ToggleButton;
