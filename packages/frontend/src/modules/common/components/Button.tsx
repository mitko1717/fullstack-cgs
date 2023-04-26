import React from 'react';
import styled from 'styled-components';

const ButtonComponent = styled.button`
  height: 40px;
  border: 2px solid black;
  color: black;
  padding: 6px 10px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: black;
  }
`;

interface IButton {
  text: string;
}

const Button = ({ text }: IButton) => <ButtonComponent>{text}</ButtonComponent>;

export default Button;
