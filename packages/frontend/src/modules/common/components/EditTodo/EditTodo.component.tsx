import React from 'react';
import { Formik, Field, ErrorMessage, useFormik } from 'formik';
import * as yup from 'yup';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useQueryClient, useMutation } from 'react-query';
import { ButtonsContainer, FormItem, EditTodoForm, ButtonComponent } from './EditTodo.styled';
import Button from '../Button';
import { APP_KEYS } from '../../consts';
import HttpService from '../../../../http.service';
import { EditTodo } from '../../types/AddTodo.types';
import { ITodo } from '../../../../interfaces/interface';
// import { queryClient } from '../../../app/queryClient';

type IInitialValues = {
  title: string;
  description: string;
};

const http = new HttpService('http://localhost:4200', 'api');

export const EditTodoComponent = () => {
  const queryClient = useQueryClient();
  //
  const navigate = useNavigate();
  const { id } = useParams(); // get id from router
  const cashedTodoData = queryClient.getQueryData<ITodo>(['todo', id]);

  const editTodo = useMutation((formData: EditTodo) => http.put('todos', id, formData), {
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

  const initialValues = {
    title: '',
    description: ''
  };

  const handleSubmit = (values: IInitialValues) => {
    const formData = {
      title: values.title,
      description: values.description,
      completed: cashedTodoData?.completed || false,
      private: cashedTodoData?.private || false,
      userId: 1
    };
    editTodo.mutate(formData);
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
        <EditTodoForm onSubmit={formik.handleSubmit}>
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
              Edit
            </ButtonComponent>
          </ButtonsContainer>
        </EditTodoForm>
      )}
    </Formik>
  );
};
