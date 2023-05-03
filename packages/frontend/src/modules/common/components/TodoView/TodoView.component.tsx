import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { toast } from 'react-hot-toast';
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
// import ToggleButton from '../ToggleButton';
import { APP_KEYS } from '../../consts';
import todoService from '../../../../service/todo.service';
import Layout from '../Layout';
import { ToggleButton } from '../TodoElement/TodoElement.styled';
import { Check, Cross } from '../TodoElement/icons';
import { useOnCompleteSuccess } from '../../../../helper/onSuccess';

export const TodoViewComponent = () => {
  const { id } = useParams(); // get id from router
  const fetchTodo = async () => todoService.getOneTodo(id || 1);
  const { data, isLoading, isError } = useQuery<ITodo>(['todo', id], fetchTodo);

  const onCompleteSuccess = useOnCompleteSuccess();
  const onFinish = {
    onSuccess: () => {
      onCompleteSuccess();
      toast.success('Changes successfully made!');
    },
    onError: () => {
      toast.error('Something went wrong');
    }
  };

  const setPrivateStatusTodo = useMutation((ind: string | number) => {
    if (data?.private) {
      return todoService.setNotPrivateTodo(ind);
    }
    return todoService.setPrivateTodo(ind);
  }, onFinish);

  const completeTodo = useMutation((ind: string | number) => {
    if (data?.completed) {
      return todoService.uncompleteTodo(ind);
    }
    return todoService.completeTodo(ind);
  }, onFinish);

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">Error fetching data happened!</Alert>;

  return (
    <Layout>
      {data ? (
        <TodoView>
          <>
            <Title>{data.title}</Title>
            <span>Description:</span>
            <Description>{data.description}</Description>
            <Buttons>
              <ButtonDiv>
                <span>Complete</span>
                {/* <ToggleButton toggled={data.completed} /> */}
                <ToggleButton toggled={data.completed} onClick={() => completeTodo.mutate(data.id)}>
                  {data.completed ? <Check /> : <Cross />}
                </ToggleButton>
              </ButtonDiv>
              <ButtonDiv>
                <span>Private</span>
                <ToggleButton
                  toggled={data.private}
                  onClick={() => setPrivateStatusTodo.mutate(data.id)}
                >
                  {data.private ? <Check /> : <Cross />}
                </ToggleButton>
                {/* <ToggleButton toggled={data.private} onClick={() => setPrivateStatusTodo.mutate(data.id)}/> */}
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
      )}
    </Layout>
  );
};
