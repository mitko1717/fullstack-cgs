import React from 'react';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import { Link, useParams } from 'react-router-dom';
import { useQueryClient, useMutation } from 'react-query';
import { Box, Grid } from '@mui/material';
import { toast } from 'react-hot-toast';
import { EditTodoForm } from './EditUser.styled';
import { ButtonComponent } from '../Button';
import { ITodoEdit } from '../../types/AddTodo.types';
import { ITodo } from '../../../../interfaces/interface';
import todoService from '../../../../service/todo.service';
import { IInitialValues } from '../../types/AddTodoValues';
import { useOnAddTodoSuccess } from '../../../../helper/onSuccess';
import { APP_KEYS } from '../../consts';
import GridComponent from '../GridContainer';

export const EditUserComponent = () => {
  const onAddTodoSuccess = useOnAddTodoSuccess();
  const queryClient = useQueryClient();
  const { id } = useParams(); // get id from router
  const cashedTodoData = queryClient.getQueryData<ITodo>(['todo', id]);
  const editTodo = useMutation((formData: ITodoEdit) => todoService.editTodo(formData), {
    onSuccess: () => {
      onAddTodoSuccess();
      toast.success('Todo edited successfully!');
    },
    onError: () => {
      toast.error('Todo wasnt edited!');
      throw new Error();
    }
  });

  const formSchema = yup.object().shape({
    title: yup.string().max(40, '40 charecters or less').required('required'),
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
            {Object.keys(initialValues).map((key) => (
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
