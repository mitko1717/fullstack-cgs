import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { SliderContainer, TodoContainer, ButtonBox } from './TodoContainer.styled';
import { ITodo } from '../../../../interfaces/interface';
import { TodoElementContainer } from '../TodoElement';
import { TodoSlider } from './TodoSlider';
import HttpService from '../../../../http.service';
import { APP_KEYS } from '../../consts';
import Button from '../Button';
// import { queryClient } from '../../../app/queryClient';

export const TodoContainerContainer = () => {
  const http = new HttpService('http://localhost:4200', 'api');
  const fetchTodos = async () => http.getAll('todos');
  const { data, isLoading, isError } = useQuery<ITodo[]>({
    queryFn: fetchTodos,
    queryKey: ['todos']
  });

  // useEffect(() => {
  //   console.log(queryClient.getQueryData(['todos']));
  // }, [data]);

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">Error fetching data happened!</Alert>;

  return data ? (
    <>
      <ButtonBox>
        <Link to={APP_KEYS.ROUTER_KEYS.ADDTODO}>
          <Button text="add new todo" />
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
