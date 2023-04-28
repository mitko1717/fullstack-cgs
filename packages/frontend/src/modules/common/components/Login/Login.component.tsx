import React from 'react';
import { Formik, Field, useFormik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { Box, FormControl, Grid, Input, InputLabel } from '@mui/material';
import { ButtonComponent } from '../Button';
import { LoginForm } from './Login.styled';
import { APP_KEYS } from '../../consts';

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
            <Grid item xs={12}>
              <FormControl fullWidth error={formik.touched.email && Boolean(formik.errors.email)}>
                <InputLabel htmlFor="email">email</InputLabel>
                <Field
                  name="email"
                  value={formik.values.email}
                  type="email"
                  as={Input}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.errors.email && formik.touched.email && (
                  <div style={{ color: 'red' }}>{formik.errors.email}</div>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl
                fullWidth
                error={formik.touched.password && Boolean(formik.errors.password)}
              >
                <InputLabel htmlFor="password">password</InputLabel>
                <Field
                  name="password"
                  value={formik.values.password}
                  type="password"
                  as={Input}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.errors.password && formik.touched.password && (
                  <div style={{ color: 'red' }}>{formik.errors.password}</div>
                )}
              </FormControl>
            </Grid>

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
