import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { ITodo } from '../../../../interfaces/interface';
import {
  TodoView,
  Title,
  Description,
  Buttons,
  ButtonDiv,
  ButtonsContainer
} from './TodoView.styled';
import { ButtonComponent } from '../Button';
import ToggleButton from '../ToggleButton';
import { APP_KEYS } from '../../consts';
import { http } from '../../../../http.service';

export const TodoViewComponent = () => {
  const { id } = useParams(); // get id from router
  const fetchTodo = async () => http.getOne('todos', id);
  const { data, isLoading, isError } = useQuery<ITodo>(['todo', id], fetchTodo);

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">Error fetching data happened!</Alert>;

  return data ? (
    <TodoView>
      <>
        <Title>{data.title}</Title>
        <span>Description:</span>
        <Description>{data.description}</Description>
        <Buttons>
          <ButtonDiv>
            <span>Complete</span>
            <ToggleButton toggled={data.completed} />
          </ButtonDiv>
          <ButtonDiv>
            <span>Private</span>
            <ToggleButton toggled={data.private} />
          </ButtonDiv>
        </Buttons>
      </>
      <ButtonsContainer>
        <Link to={`/${APP_KEYS.ROUTER_KEYS.EDIT}/${id}`}>
          <ButtonComponent>edit todo</ButtonComponent>
        </Link>
        <Link to={APP_KEYS.ROUTER_KEYS.CONTENT}>
          <ButtonComponent>back</ButtonComponent>
        </Link>
      </ButtonsContainer>
    </TodoView>
  ) : (
    <span />
  );
};
