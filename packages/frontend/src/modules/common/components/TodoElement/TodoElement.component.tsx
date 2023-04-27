import React from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { ITodo } from '../../../../interfaces/interface';
import { TodoElement, TodoTitle, TodoDescription, TodoButtons } from './TodoElement.styled';
import Button from '../Button';
import ToggleButton from '../ToggleButton';

interface Item {
  item: ITodo;
}

const fetchTodo = async (id: string) => {
  const response = await fetch(`http://localhost:4200/api/todos/${id}`);
  return response.json();
};

export const TodoElementContainer = ({ item }: Item) => {
  const { id } = useParams(); // get id from router
  const { data, isLoading, isError } = useQuery(['todo', id], () => id && fetchTodo(id));
  console.log(data, isLoading, isError);

  return (
    <TodoElement>
      <TodoTitle>{item.title}</TodoTitle>
      <TodoDescription>{item.description}</TodoDescription>
      <TodoButtons>
        <Link to={`/todo/${item.id}`}>
          <Button text="View" />
        </Link>
        <Button text="Delete" />
        <ToggleButton toggled={item.completed} />
      </TodoButtons>
    </TodoElement>
  );
};
