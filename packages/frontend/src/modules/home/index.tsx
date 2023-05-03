import React from 'react';
import styled from 'styled-components';
import { TodoContainerContainer } from '../common/components/TodoContainer';

export const MainBox = styled('div')`
  display: flex;
  flex-direction: column;
`;

const HomePageContainer = () => (
  <MainBox>
    <TodoContainerContainer />
  </MainBox>
);

export default HomePageContainer;
