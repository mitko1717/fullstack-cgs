import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { SPACES } from '../../theme';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Div = styled('div')`
  padding: ${SPACES.l};
`;

const Layout = ({ children }: LayoutProps) => (
  <Div>
    <Header />
    {children}
  </Div>
);

export default Layout;
