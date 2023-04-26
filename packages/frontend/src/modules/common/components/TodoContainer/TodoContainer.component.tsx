import React from 'react';
import { TodoContainer } from './TodoContainer.styled';
import { ITodo } from '../../../../interfaces/interface';
import { TodoElementContainer } from '../TodoElement';

const items: ITodo[] = [
  {
    id: 6,
    title: 'New Todo Title',
    description:
      'The above code uses styled-components to define the styles for the TodoApp in both mobile-first and desktop modes.',
    completed: false,
    private: false,
    userId: 1,
    user: {
      id: 1,
      email: 'john@example.com',
      password: 'password'
    }
  },
  {
    id: 2,
    title: 'Put Todo Title',
    description:
      "Additionally, has a background color that alternates between light and dark shades depending on whether it's an even or odd index.",
    completed: false,
    private: false,
    userId: 1,
    user: {
      id: 1,
      email: 'john@example.com',
      password: 'password'
    }
  },
  {
    id: 7,
    title: 'New Todo Title',
    description:
      'The above code uses styled-components to define the styles for the TodoApp in both mobile-first and desktop modes.',
    completed: false,
    private: false,
    userId: 1,
    user: {
      id: 1,
      email: 'john@example.com',
      password: 'password'
    }
  }
];

export const TodoContainerContainer = () => (
  <TodoContainer>
    {items.map((item) => (
      <TodoElementContainer key={item.id} item={item} />
    ))}
  </TodoContainer>
);
