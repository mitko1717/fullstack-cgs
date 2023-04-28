import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { SliderContainer, TodoContainer, ButtonBox } from './TodoContainer.styled';
import { ITodo } from '../../../../interfaces/interface';
import { TodoElementContainer } from '../TodoElement';
import { TodoSlider } from './TodoSlider';
import { APP_KEYS } from '../../consts';
import { ButtonComponent } from '../Button';
import { http } from '../../../../http.service';
import { QUERY_KEYS } from '../../consts/app-keys.const';

export const TodoContainerContainer = () => {
  const fetchTodos = async () => http.getAll('todos');
  const { data, isLoading, isError } = useQuery<ITodo[]>({
    queryFn: fetchTodos,
    queryKey: QUERY_KEYS.TODOS
  });

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">Error fetching data happened!</Alert>;

  return data ? (
    <>
      <ButtonBox>
        <Link to={APP_KEYS.ROUTER_KEYS.ADDTODO}>
          <ButtonComponent>add new todo</ButtonComponent>
        </Link>
      </ButtonBox>

      <TodoContainer>
        {data.map((item) => (
          <TodoElementContainer key={item.id} item={item} />
        ))}
      </TodoContainer>

      {/* tablet slider */}
      <SliderContainer>
        <TodoSlider items={data} />
      </SliderContainer>
    </>
  ) : (
    <span />
  );
};
