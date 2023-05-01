import React from 'react';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { ButtonComponent } from '../Button';
import { LoginForm } from './Login.styled';
import { APP_KEYS } from '../../consts';
import GridComponent from '../GridContainer';

export const LoginComponent = () => {
  const formSchema = yup.object().shape({
    email: yup.string().max(20, '20 charecters or less').required('required'),
    password: yup.string().required('Required')
  });

  const initialValues = {
    email: '',
    password: ''
  };

  // const handleSubmit = (values: any) => {
  //   const formData = {
  //     email: values.title,
  //     password: values.password
  //   };
  //   addTodo.mutate(formData);
  // };

  const formik = useFormik({
    initialValues,
    validationSchema: formSchema,
    // onSubmit: (values) => handleSubmit(values)
    onSubmit: () => {}
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={() => {
        // Handle form submission
      }}
    >
      <LoginForm>
        <Box m={3}>
          <Grid container spacing={2}>
            {Object.keys(initialValues).map((key) => (
              <GridComponent key={key} value={key} formik={formik} />
            ))}
            <Grid item xs={12} justifyContent="space-between" display="flex">
              <Link to={APP_KEYS.ROUTER_KEYS.ROOT}>
                <ButtonComponent>Back</ButtonComponent>
              </Link>
              <ButtonComponent>Submit</ButtonComponent>
            </Grid>
          </Grid>
        </Box>
      </LoginForm>
    </Formik>
  );
};
