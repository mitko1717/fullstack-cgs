import styled from 'styled-components';
import { DEVICE, SPACES } from '../../../theme';

export const EditTodoForm = styled('form')`
  display: flex;
  flex-direction: column;
  padding: ${SPACES.sm};
  width: 100%;
  height: 100%;
  row-gap: ${SPACES.sm};

  @media ${DEVICE.tablet} {
    width: 70%;
    margin: 0 auto;
  }
`;

export const FormItem = styled('div')`
  display: flex;
  flex-direction: column;
`;

export const ButtonsContainer = styled('div')`
  display: flex;
  justify-content: space-between;
`;
