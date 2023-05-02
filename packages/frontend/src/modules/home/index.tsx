import React from 'react';
import styled from 'styled-components';
import { TodoContainerContainer } from '../common/components/TodoContainer';
import { SPACES } from '../theme';

export const MainBox = styled('div')`
  display: flex;
  padding: ${SPACES.l};
  flex-direction: column;
`;

const HomePageContainer = () => (
  <MainBox>
    <TodoContainerContainer />
  </MainBox>
);

export default HomePageContainer;
