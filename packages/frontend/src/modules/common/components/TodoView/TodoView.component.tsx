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

// interface Item {
//   item?: ITodo;
// }

const fetchTodo = async (id: string) => {
  const response = await fetch(`http://localhost:4200/api/todos/${id}`);
  return response.json();
};

// export const TodoViewComponent = ({ item }: Item ) => {
export const TodoViewComponent = () => {
  const { id } = useParams(); // get id from router
  const { data, isLoading, isError } = useQuery(['todo', id], () => id && fetchTodo(id));
  console.log(data, isLoading, isError);

  const item: ITodo = {
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
