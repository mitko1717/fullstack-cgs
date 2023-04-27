import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { SliderContainer, TodoContainer, ButtonBox } from './TodoContainer.styled';
import { ITodo } from '../../../../interfaces/interface';
import { TodoElementContainer } from '../TodoElement';
import { TodoSlider } from './TodoSlider';
import HttpService from '../../../../http.service';
import { APP_KEYS } from '../../consts';
import Button from '../Button';

const items: ITodo[] = [
  {
    id: 6,
    title: 'New Todo Title',
    description:
      'The above code uses styled-components to define the styles for the TodoApp in both mobile-first and desktop modes.',
    completed: false,
    private: false,
    userId: 1
  },
  {
    id: 2,
    title: 'Put Todo Title',
    description:
      "Additionally, has a background color that alternates between light and dark shades depending on whether it's an even or odd index.",
    completed: false,
    private: false,
    userId: 1
  },
  {
    id: 7,
    title: 'New Todo Title',
    description:
      'The above code uses styled-components to define the styles for the TodoApp in both mobile-first and desktop modes.',
    completed: false,
    private: false,
    userId: 1
  }
];

const http = new HttpService('http://localhost:4200', 'api');

export const useFetchTodos = () => useQuery('todos', () => http.getAll('todos'));

// const fetchTodos = async () => {
//   const response = await fetch('http://localhost:4200/api/todos/');
//   return response.json();
// };

export const TodoContainerContainer = () => {
  const { data, isLoading, isError } = useQuery('todos', useFetchTodos);
  console.log(data, isLoading, isError);

  return (
    <>
      <ButtonBox>
        <Link to={APP_KEYS.ROUTER_KEYS.ADDTODO}>
          <Button text="add new todo" />
        </Link>
      </ButtonBox>

      <TodoContainer>
        {items.map((item) => (
          <TodoElementContainer key={item.id} item={item} />
        ))}
      </TodoContainer>

      {/* tablet slider */}
      <SliderContainer>
        <TodoSlider items={items} />
      </SliderContainer>
    </>
  );
};
