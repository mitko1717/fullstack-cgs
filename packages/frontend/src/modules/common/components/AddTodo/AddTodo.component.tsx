import React from 'react';
import { Field, useFormik, Formik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import { Box, FormControl, Grid, Input, InputLabel } from '@mui/material';
import { AddTodoForm } from './AddTodo.styled';
import { ButtonComponent } from '../Button';
import { APP_KEYS } from '../../consts';
import { AddTodo } from '../../types/AddTodo.types';
import { IInitialValues } from '../../types/AddTodoValues';
import { http } from '../../../../http.service';
import { useOnAddTodoSuccess } from '../../../../helper/onSuccess';

export const AddTodoComponent = () => {
  const onAddTodoSuccess = useOnAddTodoSuccess();
  const addTodo = useMutation((formData: AddTodo) => http.post('todos', formData), {
    onSuccess: onAddTodoSuccess,
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
    validationSchema: formSchema,
    onSubmit: (values) => handleSubmit(values)
  });

  return (
    <Formik initialValues={initialValues} validationSchema={formSchema} onSubmit={() => {}}>
      <AddTodoForm onSubmit={formik.handleSubmit}>
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
              <ButtonComponent type="submit">Add</ButtonComponent>
            </Grid>
          </Grid>
        </Box>
      </AddTodoForm>
    </Formik>
  );
};
