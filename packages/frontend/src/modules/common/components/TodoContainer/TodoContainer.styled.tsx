import { Box, Grid } from '@mui/material';
import styled from 'styled-components';
import { SPACES, DEVICE } from '../../../theme';

export const TodoContainer = styled('div')`
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  @media ${DEVICE.tablet} {
    display: none;
  }
  @media ${DEVICE.desktop} {
    display: flex;
    width: 90%;
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

export const ButtonGrid = styled(Grid)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  column-gap: ${SPACES.s};
  row-gap: ${SPACES.s};
  @media ${DEVICE.desktop} {
    justify-content: unset;
  }
`;

export const ContainerInputButtons = styled(Box)`
  display: flex;
  flex-direction: column;
  @media ${DEVICE.desktop} {
    flex-direction: row;
  }
`;
