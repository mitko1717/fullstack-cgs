import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { ButtonsContainer, FormItem, AddTodoForm, ButtonComponent } from './AddTodo.styled';
import Button from '../Button';
import { APP_KEYS } from '../../consts';
import HttpService from '../../../../http.service';
import { AddTodo } from '../../types/AddTodo.types';

const http = new HttpService('http://localhost:4200', 'api');

export const AddTodoComponent = () => {
  const navigate = useNavigate();
  const addTodo = useMutation((formData: AddTodo) => http.post('/todos/', formData), {
    onSuccess: () => {
      navigate('/todos');
    },
    onError: (error) => {
      navigate('/todos');
      console.error(error);
    }
  });

  const formSchema = yup.object().shape({
    post: yup.string().max(20, '20 charecters or less').required('Name is required'),
    description: yup.string().required('Required')
  });

  const initialValues = {
    post: '',
    description: ''
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={(values) => {
        const formData = {
          title: values.post,
          description: values.description,
          completed: false,
          private: false,
          userId: 1
        };
        addTodo.mutate(formData);
      }}
    >
      {({ isSubmitting }) => (
        <AddTodoForm>
          <FormItem>
            <label htmlFor="post">post</label>
            <Field name="post" type="post" />
            <ErrorMessage name="post" />
          </FormItem>

          <FormItem>
            <label htmlFor="description">description</label>
            <Field name="description" type="description" />
            <ErrorMessage name="description" />
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
