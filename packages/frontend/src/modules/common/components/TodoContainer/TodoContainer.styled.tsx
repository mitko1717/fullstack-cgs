import styled from 'styled-components';
import { SPACES, DEVICE } from '../../../theme';

export const TodoContainer = styled('div')`
  display: flex;
  flex-direction: column;
  /* width: 90%; */
  margin: 0 auto;
  /* padding: ${SPACES.l}; */

  @media ${DEVICE.tablet} {
    display: none;
  }

  @media ${DEVICE.desktop} {
    display: flex;
    width: 75%;
  }
`;

export const SliderContainer = styled.div`
  display: none;
  @media ${DEVICE.tablet} {
    display: flex;
  }

  @media ${DEVICE.desktop} {
    display: none;
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  margin: ${SPACES.l} 0;
  justify-content: center;
`;
