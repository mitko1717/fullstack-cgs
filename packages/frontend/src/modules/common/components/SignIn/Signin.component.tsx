import React from 'react';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { SigninForm } from './Signin.styled';
import { APP_KEYS } from '../../consts';
import { ButtonComponent } from '../Button';
import GridComponent from '../GridContainer';

export const SigninComponent = () => {
  const formSchema = yup.object().shape({
    email: yup.string().max(20, '20 charecters or less').required('required'),
    password: yup.string().required('Required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Required')
  });
  const initialValues = {
    email: '',
    password: '',
    confirmPassword: ''
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
      <SigninForm>
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
