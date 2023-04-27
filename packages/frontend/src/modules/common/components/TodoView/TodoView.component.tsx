import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
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

// export const useFetchTodo = (id: number) => useQuery(['todo', id], () => http.getOne('todos', id));

export const TodoViewComponent = () => {
  const { id } = useParams(); // get id from router

  const fetchTodo = async () => http.getOne('todos', id);

  const { data } = useQuery(['todo', id], fetchTodo); // data, isLoading, isError
  console.log(data);

  const item: ITodo = {
    id: 7,
    title: 'New Todo Title',
    description:
      'The above code uses styled-components to define the styles for the TodoApp in both mobile-first and desktop modes.',
    completed: false,
    private: false,
    userId: 1
  };

  return (
    <TodoView>
      {item ? (
        <>
          <Title>{item.title}</Title>
          <span>Description:</span>
          <Description>{item.description}</Description>
          <Buttons>
            <ButtonDiv>
              <span>Complete</span>
              <ToggleButton toggled={item.completed} />
            </ButtonDiv>
            <ButtonDiv>
              <span>Private</span>
              <ToggleButton toggled={item.private} />
            </ButtonDiv>
          </Buttons>
        </>
      ) : (
        <div>Loading...</div>
      )}

      <ButtonsContainer>
        <Link to={`/editTodo/${item.id}`}>
          <Button text="Edit todo" />
        </Link>
        <Link to={APP_KEYS.ROUTER_KEYS.STARTPAGE}>
          <Button text="Back" />
        </Link>
      </ButtonsContainer>
    </TodoView>
  );
};
