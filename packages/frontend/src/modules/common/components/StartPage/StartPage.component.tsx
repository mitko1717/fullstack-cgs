import React from 'react';
import { Link } from 'react-router-dom';
import { APP_KEYS } from '../../consts';
import { ButtonComponent } from '../Button';
import { ButtonsContainer, Span, StartPage, Title } from './StartPage.styled';

export const StartPageComponent = () => (
  <StartPage>
    <Title>App Name</Title>
    <ButtonsContainer>
      <Link to={APP_KEYS.ROUTER_KEYS.LOGIN}>
        <ButtonComponent>Login</ButtonComponent>
      </Link>
      <Link to={APP_KEYS.ROUTER_KEYS.SIGNIN}>
        <ButtonComponent>Register</ButtonComponent>
      </Link>
      <Link to={APP_KEYS.ROUTER_KEYS.FORGET_PASSWORD}>
        <Span>Forget Password?</Span>
      </Link>
    </ButtonsContainer>
  </StartPage>
);
