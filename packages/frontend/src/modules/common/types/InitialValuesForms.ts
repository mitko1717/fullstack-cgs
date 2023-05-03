import { IInitialValues } from './AddTodoValues';
import { IInitialValuesSignIn, ILoginData } from './Login.types';

export const initialValuesEditForm = {
  password: ''
};

export const initialValuesEditTodo: IInitialValues = {
  title: '',
  description: ''
};

export const initialValuesAddTodo: IInitialValues = {
  title: '',
  description: ''
};

export const initialValuesLogin: ILoginData = {
  email: '',
  password: ''
};

export const initialValuesPasswordComp = {
  email: ''
};

export const initialValuesSignIn: IInitialValuesSignIn = {
  email: '',
  password: '',
  confirmPassword: ''
};
