import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { ITodo } from '../../../../interfaces/interface';
import {
  TodoElement,
  TodoTitle,
  TodoDescription,
  TodoButtons,
  ButtonComponent
} from './TodoElement.styled';
import Button from '../Button';
import ToggleButton from '../ToggleButton';
import HttpService from '../../../../http.service';

interface Item {
  item: ITodo;
}

const http = new HttpService('http://localhost:4200', 'api');

export const TodoElementContainer = ({ item }: Item) => {
  const queryClient = useQueryClient();
  const deleteTodo = useMutation((id: number) => http.delete('todos', id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
    onError: () => {
      throw new Error();
    }
  });

  return (
    <TodoElement>
      <TodoTitle>{item.title}</TodoTitle>
      <TodoDescription>{item.description}</TodoDescription>
      <TodoButtons>
        <Link to={`/todo/${item.id}`}>
          <Button text="View" />
        </Link>
        <ButtonComponent onClick={() => deleteTodo.mutate(item.id)}>Delete</ButtonComponent>
        <ToggleButton toggled={item.completed} />
      </TodoButtons>
    </TodoElement>
  );
};
