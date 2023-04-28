import styled from 'styled-components';
import { SPACES, DEVICE, COLORS } from '../../../theme';
import { SIZES } from '../../../theme/fonts.const';

export const TodoElement = styled('div')`
  display: flex;
  flex-direction: column;
  padding: ${SPACES.s};
  height: 33vh;

  @media ${DEVICE.tablet} {
    width: 80%;
    margin: ${SPACES.m} 0;
  }

  @media ${DEVICE.desktop} {
    width: 100%;
    height: 100px;
    column-gap: 15px;
    flex-direction: row;
    margin: unset;
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
  margin-top: auto;
  width: 100%;
  justify-content: space-around;

  @media ${DEVICE.desktop} {
    margin-top: none;
    justify-content: center;
    margin: auto;
    column-gap: 5px;
    align-self: center;
    width: 20%;
  }
`;

interface ButtonProps {
  toggled?: boolean;
}

export const ToggleButton = styled.button<ButtonProps>`
  height: 40px;
  min-width: 50px;
  background-color: ${(props) => (props.toggled ? `${COLORS.green}` : `${COLORS.white}`)};
  color: ${(props) => (props.toggled ? `${COLORS.white}` : `${COLORS.green}`)};
  border: 1px solid green;
  padding: ${SPACES.xxs};
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: ${(props) => (props.toggled ? `${COLORS.white}` : `${COLORS.green}`)};
    color: ${(props) => (props.toggled ? `${COLORS.green}` : `${COLORS.white}`)};
    border-color: ${COLORS.white};
  }
`;
