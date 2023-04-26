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
    height: 100px;
    column-gap: 15px;
    flex-direction: row;
  }
`;

export const TodoTitle = styled.div`
  font-size: ${SIZES.large};
  margin-bottom: ${SPACES.s};
  @media ${DEVICE.desktop} {
    width: 10%;
    font-size: ${SIZES.medium};
    margin: ${SPACES.s} 0;
    padding-bottom: ${SPACES.xxs};
  }
`;

export const TodoDescription = styled.div`
  font-size: ${SIZES.medium};
  margin: ${SPACES.s} 0;
  font-weight: bold;
  overflow-y: scroll;
  padding-bottom: ${SPACES.xxs};
  @media ${DEVICE.desktop} {
    width: 70%;
  }
`;

export const TodoButtons = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: ${SPACES.xxs};
  /* height: 50px; */
  margin-top: auto;
  width: 100%;
  justify-content: space-around;

  @media ${DEVICE.desktop} {
    margin-top: none;
    justify-content: center;
    margin: auto;
    column-gap: 10px;
    align-self: center;
    width: 20%;
  }
`;
