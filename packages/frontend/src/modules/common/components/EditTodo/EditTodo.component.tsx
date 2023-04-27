import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { ButtonsContainer, FormItem, EditTodoForm } from './EditTodo.styled';
import Button from '../Button';
import { APP_KEYS } from '../../consts';
import HttpService from '../../../../http.service';
import { EditTodo } from '../../types/AddTodo.types';

const http = new HttpService('http://localhost:4200', 'api');

export const EditTodoComponent = () => {
  const { id } = useParams(); // get id from router
  const queryClient = useQueryClient();
  const cashedTodoData = queryClient.getQueryData(['todo', id]);
  console.log('cashedTodoData', cashedTodoData);
  const editTodo = useMutation((formData: EditTodo) => http.put(`/todos/${id}`, formData));

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
          completed: false, // cashedTodoData.completed
          private: false, // cashedTodoData.private
          userId: 1
        };
        editTodo.mutate(formData);
      }}
    >
      {() => (
        <EditTodoForm>
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
            <Button text="Edit" />
          </ButtonsContainer>
        </EditTodoForm>
      )}
    </Formik>
  );
};
