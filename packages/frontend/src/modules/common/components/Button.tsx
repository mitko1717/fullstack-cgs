import styled from 'styled-components';
import { COLORS, SPACES } from '../../theme';

export const ButtonComponent = styled.button`
  height: 40px;
  border: ${SPACES.xxs} solid ${COLORS.black};
  color: black;
  padding: ${SPACES.xs};
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: ${COLORS.white};
    color: ${COLORS.black};
  }
`;
