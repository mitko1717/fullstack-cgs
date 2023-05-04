import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import { toast } from 'react-hot-toast';
import { ITodo } from '../../../../interfaces/interface';
import {
  TodoElement,
  TodoTitle,
  TodoDescription,
  TodoButtons,
  ToggleButton
} from './TodoElement.styled';
import { ButtonComponent } from '../Button';
import { Check, Cross } from './icons';
import todoService from '../../../../service/todo.service';
import { useOnDeleteSuccess, useOnCompleteSuccess } from '../../../../helper/onSuccess';

interface Item {
  item: ITodo;
}

export const TodoElementContainer = ({ item }: Item) => {
  const onDeleteSuccess = useOnDeleteSuccess();
  const onCompleteSuccess = useOnCompleteSuccess();

  const deleteTodo = useMutation((id: number) => todoService.deleteTodo(id), {
    onSuccess: () => {
      onDeleteSuccess();
      toast.success('Todo deleted successfully!');
    },
    onError: () => {
      toast.error('Todo wasnt deleted!');
    }
  });

  // added if cause lind dont skip ternary
  const completeTodo = useMutation(
    () => {
      if (item.completed) {
        return todoService.uncompleteTodo(item.id);
      }
      return todoService.completeTodo(item.id);
    },
    {
      onSuccess: () => {
        onCompleteSuccess();
        toast.success('Changes successfully made!');
      },
      onError: () => {
        toast.error('Something went wrong');
      }
    }
  );

  return (
    <TodoElement>
      <TodoTitle>{item.title}</TodoTitle>
      <TodoDescription>{item.description}</TodoDescription>
      <TodoButtons>
        <Link to={`/todo/${item.id}`}>
          <ButtonComponent>View</ButtonComponent>
        </Link>
        <ButtonComponent onClick={() => deleteTodo.mutate(item.id)}>Delete</ButtonComponent>
        <ToggleButton toggled={item.completed} onClick={() => completeTodo.mutate()}>
          {item.completed ? <Check /> : <Cross />}
        </ToggleButton>
      </TodoButtons>
    </TodoElement>
  );
};
