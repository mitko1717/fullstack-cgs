import React from 'react';
import { Formik, useFormik } from 'formik';
import { Link, useParams } from 'react-router-dom';
import { useQueryClient, useMutation } from 'react-query';
import { Box, Grid } from '@mui/material';
import { EditTodoForm } from './EditTodo.styled';
import { ButtonComponent } from '../Button';
import { ITodoEdit } from '../../types/AddTodo.types';
import { ITodo } from '../../../../interfaces/interface';
import todoService from '../../../../service/todo.service';
import { IInitialValues } from '../../types/AddTodoValues';
import { useOnAddTodoSuccess } from '../../../../helper/onSuccess';
import { APP_KEYS } from '../../consts';
import GridComponent from '../GridContainer';
import { initialValuesEditTodo } from '../../types/InitialValuesForms';
import { formSchemaEditTodo } from '../../../../helper/validation';

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
    initialValues: initialValuesEditTodo,
    validationSchema: formSchemaEditTodo,
    onSubmit: (values) => handleSubmit(values)
  });

  return (
    <Formik
      initialValues={initialValuesEditTodo}
      validationSchema={formSchemaEditTodo}
      onSubmit={() => {}}
    >
      <EditTodoForm onSubmit={formik.handleSubmit}>
        <Box m={3}>
          <Grid container spacing={2}>
            {Object.keys(initialValuesEditTodo).map((key) => (
              <GridComponent key={key} value={key} formik={formik} />
            ))}
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
