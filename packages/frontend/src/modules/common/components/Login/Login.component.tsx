import React from 'react';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { useMutation } from 'react-query';
import { toast } from 'react-hot-toast';
import { ButtonComponent } from '../Button';
import { LoginForm } from './Login.styled';
import { APP_KEYS } from '../../consts';
import GridComponent from '../GridContainer';
import { useOnLoginSuccess } from '../../../../helper/onSuccess';
import userService from '../../../../service/user.service';
import { ILoginData } from '../../types/Login.types';

export const LoginComponent = () => {
  const onLoginSuccess = useOnLoginSuccess();
  const login = useMutation((formData: ILoginData) => userService.loginUser(formData), {
    onSuccess: (data, formData) => {
      onLoginSuccess();
      localStorage.setItem('token', `Bearer ${data}`);
      localStorage.setItem('email', formData.email);
      toast.success('Logged in successfully!');
    },
    onError: () => {
      toast.error('Some error occurred while logging in!');
    }
  });

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .max(40, '40 charecters or less')
      .email('Must be a valid email')
      .required('required'),
    password: yup.string().required('Required')
  });

  const initialValues = {
    email: '',
    password: ''
  };

  const handleSubmit = (values: ILoginData) => {
    const formData = {
      email: values.email,
      password: values.password
    };
    login.mutate(formData);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: formSchema,
    onSubmit: (values) => handleSubmit(values)
  });

  return (
    <Formik initialValues={initialValues} validationSchema={formSchema} onSubmit={() => {}}>
      <LoginForm onSubmit={formik.handleSubmit}>
        <Box m={3}>
          <Grid container spacing={2}>
            {Object.keys(initialValues).map((key) => (
              <GridComponent key={key} value={key} formik={formik} />
            ))}
            <Grid item xs={12} justifyContent="space-between" display="flex">
              <Link to={APP_KEYS.ROUTER_KEYS.ROOT}>
                <ButtonComponent>Back</ButtonComponent>
              </Link>
              <ButtonComponent type="submit">Submit</ButtonComponent>
            </Grid>
          </Grid>
        </Box>
      </LoginForm>
    </Formik>
  );
};
