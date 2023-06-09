import React from 'react';
import { useFormik, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
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
import { initialValuesAddTodo } from '../../types/InitialValuesForms';
import { formSchemaAddTodo } from '../../../../helper/validation';
import { QUERY_KEYS, STORAGE_KEYS } from '../../consts/app-keys.const';
import userService from '../../../../service/user.service';
import { IUser } from '../../../../interfaces/interface';

export const AddTodoComponent = () => {
  const email = localStorage.getItem(STORAGE_KEYS.EMAIL);
  const { data } = useQuery<IUser>(
    [QUERY_KEYS.USER, email],
    () => userService.getUserByEmail(email!),
    {
      enabled: !!email // only fetch data if email exists
    }
  );

  const onAddTodoSuccess = useOnAddTodoSuccess();
  const addTodo = useMutation((formData: ITodoCreate) => todoService.createTodo(formData), {
    onSuccess: () => {
      onAddTodoSuccess();
      toast.success('Todo added successfully!');
    },
    onError: () => {
      toast.error('Todo wasnt added!');
    }
  });

  const handleSubmit = (values: IInitialValues) => {
    const formData: ITodoCreate = {
      title: values.title,
      description: values.description,
      completed: false,
      private: false,
      userId: data?.id || 1
    };
    addTodo.mutate(formData);
  };

  const formik = useFormik({
    initialValues: initialValuesAddTodo,
    validationSchema: formSchemaAddTodo,
    onSubmit: (values) => handleSubmit(values)
  });

  return (
    <Formik
      initialValues={initialValuesAddTodo}
      validationSchema={formSchemaAddTodo}
      onSubmit={() => {}}
    >
      <AddTodoForm onSubmit={formik.handleSubmit}>
        <Box m={3}>
          <Grid container spacing={2}>
            {Object.keys(initialValuesAddTodo).map((key) => (
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
