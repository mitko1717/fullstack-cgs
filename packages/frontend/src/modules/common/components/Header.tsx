import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTER_KEYS } from '../consts/app-keys.const';
import { ButtonComponent } from './Button';

const HeaderLinks = styled('header')`
  display: flex;
  justify-content: space-around;
`;

const Header = () => (
  <HeaderLinks>
    <Link to={ROUTER_KEYS.CONTENT}>
      <ButtonComponent>Todo List</ButtonComponent>
    </Link>
    <Link to={ROUTER_KEYS.MY_PROFILE}>
      <ButtonComponent>My Profile</ButtonComponent>
    </Link>
  </HeaderLinks>
);

export default Header;
