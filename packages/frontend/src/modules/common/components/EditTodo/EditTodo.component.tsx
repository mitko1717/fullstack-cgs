import React from 'react';
import { Formik, Field, useFormik } from 'formik';
import * as yup from 'yup';
import { Link, useParams } from 'react-router-dom';
import { useQueryClient, useMutation } from 'react-query';
import { Box, FormControl, Grid, Input, InputLabel } from '@mui/material';
import { EditTodoForm } from './EditTodo.styled';
import { ButtonComponent } from '../Button';
import { ITodoEdit } from '../../types/AddTodo.types';
import { ITodo } from '../../../../interfaces/interface';
import todoService from '../../../../service/todo.service';
import { IInitialValues } from '../../types/AddTodoValues';
import { useOnAddTodoSuccess } from '../../../../helper/onSuccess';
import { APP_KEYS } from '../../consts';

export const EditTodoComponent = () => {
  const onAddTodoSuccess = useOnAddTodoSuccess();
  const queryClient = useQueryClient();
  const { id } = useParams(); // get id from router
  const cashedTodoData = queryClient.getQueryData<ITodo>(['todo', id]);

  const editTodo = useMutation((formData: ITodoEdit) => todoService.editTodo(formData), {
    onSuccess: onAddTodoSuccess,
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
    const formData: ITodoEdit = {
      title: values.title,
      description: values.description,
      completed: cashedTodoData?.completed || false,
      private: cashedTodoData?.private || false,
      id: cashedTodoData?.id || id || 1 || '1'
    };
    editTodo.mutate(formData);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: formSchema,
    onSubmit: (values) => handleSubmit(values)
  });

  return (
    <Formik initialValues={initialValues} validationSchema={formSchema} onSubmit={() => {}}>
      <EditTodoForm onSubmit={formik.handleSubmit}>
        <Box m={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth error={formik.touched.title && Boolean(formik.errors.title)}>
                <InputLabel htmlFor="title">title</InputLabel>
                <Field
                  name="title"
                  value={formik.values.title}
                  type="title"
                  as={Input}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.errors.title && formik.touched.title && (
                  <div style={{ color: 'red' }}>{formik.errors.title}</div>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl
                fullWidth
                error={formik.touched.description && Boolean(formik.errors.description)}
              >
                <InputLabel htmlFor="description">description</InputLabel>
                <Field
                  name="description"
                  value={formik.values.description}
                  type="description"
                  as={Input}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.description && formik.touched.description && (
                  <div style={{ color: 'red' }}>{formik.errors.description}</div>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} justifyContent="space-between" display="flex">
              <Link to={APP_KEYS.ROUTER_KEYS.CONTENT}>
                <ButtonComponent>Back</ButtonComponent>
              </Link>
              <ButtonComponent type="submit">Edit</ButtonComponent>
            </Grid>
          </Grid>
        </Box>
      </EditTodoForm>
    </Formik>
  );
};
