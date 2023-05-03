import styled from 'styled-components';
import { SPACES } from '../../../theme';

export const StartPage = styled('div')`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ButtonsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  row-gap: ${SPACES.sm};
  align-items: center;
`;

export const Title = styled('h2')`
  margin-bottom: ${SPACES.lg};
`;

export const Span = styled('span')`
  text-decoration: underline;
  margin-top: ${SPACES.lg};
`;
