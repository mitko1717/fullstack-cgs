import React from 'react';
import { Link } from 'react-router-dom';
import { ITodo } from '../../../../interfaces/interface';
import { TodoElement, TodoTitle, TodoDescription, TodoButtons } from './TodoElement.styled';
import Button from '../Button';
import ToggleButton from '../ToggleButton';

interface Item {
  item: ITodo;
}

export const TodoElementContainer = ({ item }: Item) => (
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
