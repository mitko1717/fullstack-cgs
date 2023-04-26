import styled from 'styled-components';
import { SPACES, DEVICE } from '../../../theme';

export const TodoContainer = styled('div')`
  display: flex;
  flex-direction: column;
  /* width: 90%; */
  margin: 0 auto;
  /* padding: ${SPACES.l}; */

  @media ${DEVICE.tablet} {
    /* max-width: 800px; */
  }

  @media ${DEVICE.desktop} {
    width: 70%;
  }
`;
