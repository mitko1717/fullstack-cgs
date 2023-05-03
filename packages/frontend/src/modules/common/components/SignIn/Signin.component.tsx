import React from 'react';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { useMutation } from 'react-query';
import { toast } from 'react-hot-toast';
import { SigninForm } from './Signin.styled';
import { APP_KEYS } from '../../consts';
import { ButtonComponent } from '../Button';
import GridComponent from '../GridContainer';
import { IInitialValues, ISignupData } from '../../types/Login.types';
import { useOnLoginSuccess } from '../../../../helper/onSuccess';
import userService from '../../../../service/user.service';

export const SigninComponent = () => {
  const onSigninSuccess = useOnLoginSuccess();
  const signin = useMutation((formData: ISignupData) => userService.registerUser(formData), {
    onSuccess: (data, formData) => {
      localStorage.setItem('token', data);
      localStorage.setItem('email', formData.email);
      onSigninSuccess();
      toast.success('signin successfully!');
    },
    onError: () => {
      toast.error('some error while signin!');
    }
  });

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .max(40, '40 charecters or less')
      .email('Must be a valid email')
      .required('required'),
    password: yup.string().required('Required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Required')
  });

  const initialValues: IInitialValues = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  const handleSubmit = (values: IInitialValues) => {
    const formData: ISignupData = {
      email: values.email,
      password: values.password
    };
    signin.mutate(formData);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: formSchema,
    onSubmit: (values) => handleSubmit(values)
  });

  return (
    <Formik initialValues={initialValues} validationSchema={formSchema} onSubmit={() => {}}>
      <SigninForm onSubmit={formik.handleSubmit}>
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
      </SigninForm>
    </Formik>
  );
};
