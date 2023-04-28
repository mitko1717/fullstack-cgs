import React from 'react';
import { Formik, Field, ErrorMessage, useFormik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { ButtonsContainer, FormItem, AddTodoForm, ButtonComponent } from './AddTodo.styled';
import Button from '../Button';
import { APP_KEYS } from '../../consts';
import HttpService from '../../../../http.service';
import { AddTodo } from '../../types/AddTodo.types';
// import { queryClient } from '../../../app/queryClient';

type IInitialValues = {
  title: string;
  description: string;
};

const http = new HttpService('http://localhost:4200', 'api');

export const AddTodoComponent = () => {
  const queryClient = useQueryClient();
  //
  const navigate = useNavigate();
  const addTodo = useMutation((formData: AddTodo) => http.post('todos', formData), {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      navigate('/todos');
    },
    onError: () => {
      throw new Error();
    }
  });

  const formSchema = yup.object().shape({
    title: yup.string().max(20, '20 charecters or less').required('required'),
    description: yup.string().required('Required')
  });

  const initialValues: IInitialValues = {
    title: '',
    description: ''
  };

  const handleSubmit = (values: IInitialValues) => {
    const formData = {
      title: values.title,
      description: values.description,
      completed: false,
      private: false,
      userId: 1
    };
    addTodo.mutate(formData);
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => handleSubmit(values)
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={formSchema} onSubmit={() => {}}>
      {({ isSubmitting }) => (
        <AddTodoForm onSubmit={formik.handleSubmit}>
          <FormItem>
            <label htmlFor="title">title</label>
            <Field
              name="title"
              type="title"
              value={formik.values.title}
              onChange={handleChange}
              onBlur={formik.handleBlur}
            />
            <ErrorMessage component="span" name="title" />
          </FormItem>

          <FormItem>
            <label htmlFor="description">description</label>
            <Field
              name="description"
              value={formik.values.description}
              type="description"
              onChange={handleChange}
              onBlur={formik.handleBlur}
            />
            <ErrorMessage component="span" name="description" />
          </FormItem>

          <ButtonsContainer>
            <Link to={APP_KEYS.ROUTER_KEYS.STARTPAGE}>
              <Button text="Back" />
            </Link>
            <ButtonComponent type="submit" disabled={isSubmitting}>
              Add
            </ButtonComponent>
          </ButtonsContainer>
        </AddTodoForm>
      )}
    </Formik>
  );
};
