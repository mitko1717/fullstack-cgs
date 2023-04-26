import React from 'react';
import styled from 'styled-components';

const ButtonComponent = styled.button`
  border: 2px solid black;
  color: black;
  padding: 6px 10px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: black;
    color: orange;
  }
`;

interface IButton {
  text: string;
}

const Button = ({ text }: IButton) => <ButtonComponent>{text}</ButtonComponent>;

export default Button;
