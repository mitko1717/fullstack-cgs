import styled from 'styled-components';
import { SPACES, DEVICE } from '../../../theme';
import { SIZES } from '../../../theme/fonts.const';

export const TodoElement = styled('div')`
  display: flex;
  flex-direction: column;
  padding: ${SPACES.s};
  height: 33vh;

  @media ${DEVICE.tablet} {
    /* max-width: 800px; */
  }

  @media ${DEVICE.desktop} {
    width: 70%;
    flex-direction: row;
  }
`;

export const TodoTitle = styled.div`
  font-size: ${SIZES.large};
  margin-bottom: ${SPACES.s};
`;

export const TodoDescription = styled.div`
  font-size: ${SIZES.medium};
  margin: ${SPACES.s} 0;
  font-weight: bold;
`;

export const TodoButtons = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  height: 50px;
  margin-top: auto;
  width: 100%;
  justify-content: space-around;

  @media ${DEVICE.tablet} {
    /* margin-top: 0; */
  }
`;
