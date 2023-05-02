import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonComponent } from './Button';

const HeaderLinks = styled('header')`
  display: flex;
  justify-content: space-around;
`;

const Header = () => (
  <HeaderLinks>
    <Link to="/todos">
      <ButtonComponent>Todo List</ButtonComponent>
    </Link>
    <Link to="/profile">
      <ButtonComponent>My Profile</ButtonComponent>
    </Link>
  </HeaderLinks>
);

export default Header;
