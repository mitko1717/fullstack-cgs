import React from 'react';
import { Link } from 'react-router-dom';
import { ITodo } from '../../../../interfaces/interface';
import { TodoView, Title, Description, Buttons, ButtonDiv } from './TodoView.styled';
import Button from '../Button';
import ToggleButton from '../ToggleButton';
import { APP_KEYS } from '../../consts';

// interface Item {
//   item?: ITodo;
// }

// export const TodoViewComponent = ({ item }: Item ) => {
export const TodoViewComponent = () => {
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

      <Link to={APP_KEYS.ROUTER_KEYS.STARTPAGE}>
        <Button text="Back" />
      </Link>
    </TodoView>
  );
};
