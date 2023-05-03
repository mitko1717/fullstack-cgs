import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { Box } from '@mui/material';
import { SliderContainer, TodoContainer, ButtonBox, ButtonGrid } from './TodoContainer.styled';
import { ITodo } from '../../../../interfaces/interface';
import { TodoElementContainer } from '../TodoElement';
import { TodoSlider } from './TodoSlider';
import { APP_KEYS } from '../../consts';
import { ButtonComponent } from '../Button';
import todoService from '../../../../service/todo.service';
import { QUERY_KEYS } from '../../consts/app-keys.const';
import Layout from '../Layout';

export const TodoContainerContainer = () => {
  const fetchTodos = async () => todoService.getAllTodos();
  const { data, isLoading, isError } = useQuery<ITodo[]>({
    queryFn: fetchTodos,
    queryKey: QUERY_KEYS.TODOS
  });

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">Error fetching data happened!</Alert>;

  return (
    <Layout>
      {data ? (
        <Box>
          <ButtonGrid container sx={{ my: 2 }} justifyContent="center" display="flex">
            <ButtonComponent>all</ButtonComponent>
            <ButtonComponent>private</ButtonComponent>
            <ButtonComponent>public</ButtonComponent>
            <ButtonComponent>completed</ButtonComponent>
          </ButtonGrid>
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
        </Box>
      ) : (
        <span />
      )}
    </Layout>
  );
};
