import styled from 'styled-components';
import { SPACES, DEVICE } from '../../../theme';
import { SIZES } from '../../../theme/fonts.const';

export const TodoView = styled('div')`
  display: flex;
  flex-direction: column;
  height: 33vh;
  padding-top: 20px;

  @media ${DEVICE.desktop} {
    width: 70%;
    margin: ${SPACES.xxl} auto 0;
  }
`;

export const Title = styled.div`
  font-size: ${SIZES.large};
  margin-bottom: ${SPACES.s};
`;

export const Description = styled.div`
  font-size: ${SIZES.medium};
  margin: ${SPACES.s} 0;
  font-weight: bold;
  overflow-y: scroll;
  padding-bottom: ${SPACES.xxs};
  height: auto;
  min-height: 100px;
  max-height: 600px;
  @media ${DEVICE.desktop} {
  }
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${SPACES.xs};
  margin-bottom: ${SPACES.xs};
  width: 100%;
  justify-content: space-around;
  row-gap: 10px;

  @media ${DEVICE.desktop} {
    width: 75%;
  }
`;

export const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const ButtonsContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;
