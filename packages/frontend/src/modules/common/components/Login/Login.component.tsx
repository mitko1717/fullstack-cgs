import React from 'react';
import { Formik, useFormik } from 'formik';
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
import { STORAGE_KEYS } from '../../consts/app-keys.const';
import { initialValuesLogin } from '../../types/InitialValuesForms';
import { formSchemaLogin } from '../../../../helper/validation';

export const LoginComponent = () => {
  const onLoginSuccess = useOnLoginSuccess();
  const login = useMutation((formData: ILoginData) => userService.loginUser(formData), {
    onSuccess: (data, formData) => {
      onLoginSuccess();
      localStorage.setItem(STORAGE_KEYS.TOKEN, `Bearer ${data}`);
      localStorage.setItem(STORAGE_KEYS.EMAIL, formData.email);
      toast.success('Logged in successfully!');
    },
    onError: () => {
      toast.error('Some error occurred while logging in!');
    }
  });

  const handleSubmit = (values: ILoginData) => {
    const formData = {
      email: values.email,
      password: values.password
    };
    login.mutate(formData);
  };

  const formik = useFormik({
    initialValues: initialValuesLogin,
    validationSchema: formSchemaLogin,
    onSubmit: (values) => handleSubmit(values)
  });

  return (
    <Formik
      initialValues={initialValuesLogin}
      validationSchema={formSchemaLogin}
      onSubmit={() => {}}
    >
      <LoginForm onSubmit={formik.handleSubmit}>
        <Box m={3}>
          <Grid container spacing={2}>
            {Object.keys(initialValuesLogin).map((key) => (
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
