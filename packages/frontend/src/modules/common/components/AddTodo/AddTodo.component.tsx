import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import { ButtonsContainer, FormItem, AddTodoForm } from './AddTodo.styled';
import Button from '../Button';
import { APP_KEYS } from '../../consts';
import HttpService from '../../../../http.service';

const http = new HttpService('http://localhost:4200', 'api');
const addTodo = useMutation((formData) => http.post('/todos/', formData));

export const SigninComponent = () => {
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
        addTodo.mutate(undefined, formData);
      }}
    >
      {() => (
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
            <Button text="Add" />
          </ButtonsContainer>
        </AddTodoForm>
      )}
    </Formik>
  );
};
