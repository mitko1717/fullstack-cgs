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
import Button from '../Button';
import ToggleButton from '../ToggleButton';
import { APP_KEYS } from '../../consts';
import HttpService from '../../../../http.service';

const http = new HttpService('http://localhost:4200', 'api');

export const TodoViewComponent = () => {
  const { id } = useParams(); // get id from router
  const fetchTodo = async () => http.getOne('todos', id);

  const { data, isLoading, isError } = useQuery<ITodo>(['todo', id], fetchTodo);

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">Error fetching data happened!</Alert>;

  return data ? (
    <TodoView>
      {/* {data ? ( */}
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
        <Link to={`/editTodo/${id}`}>
          <Button text="Edit todo" />
        </Link>
        <Link to={APP_KEYS.ROUTER_KEYS.STARTPAGE}>
          <Button text="Back" />
        </Link>
      </ButtonsContainer>
    </TodoView>
  ) : (
    <span />
  );
};
