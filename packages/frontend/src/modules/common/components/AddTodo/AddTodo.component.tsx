import React from 'react';
import { useFormik, Formik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import { Box, Grid } from '@mui/material';
import { toast } from 'react-hot-toast';
import { AddTodoForm } from './AddTodo.styled';
import { ButtonComponent } from '../Button';
import { APP_KEYS } from '../../consts';
import { ITodoCreate } from '../../types/AddTodo.types';
import { IInitialValues } from '../../types/AddTodoValues';
import todoService from '../../../../service/todo.service';
import { useOnAddTodoSuccess } from '../../../../helper/onSuccess';
import GridComponent from '../GridContainer';

export const AddTodoComponent = () => {
  const onAddTodoSuccess = useOnAddTodoSuccess();
  const addTodo = useMutation((formData: ITodoCreate) => todoService.createTodo(formData), {
    onSuccess: () => {
      onAddTodoSuccess();
      toast.success('Todo added successfully!');
    },
    onError: () => {
      toast.error('Todo wasnt added!');
      throw new Error();
    }
  });

  const formSchema = yup.object().shape({
    title: yup.string().max(40, '40 charecters or less').required('required'),
    description: yup.string().required('Required')
  });

  const initialValues: IInitialValues = {
    title: '',
    description: ''
  };

  const handleSubmit = (values: IInitialValues) => {
    const formData: ITodoCreate = {
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
            {Object.keys(initialValues).map((key) => (
              <GridComponent key={key} value={key} formik={formik} />
            ))}
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
