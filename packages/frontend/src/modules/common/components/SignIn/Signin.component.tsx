import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { ButtonsContainer, FormItem, SigninForm } from './Signin.styled';
import Button from '../Button';
import { APP_KEYS } from '../../consts';

export const SigninComponent = () => {
  const formSchema = yup.object().shape({
    name: yup.string().max(20, '20 charecters or less').required('Name is required'),
    password: yup.string().required('Required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Required')
  });
  const initialValues = {
    name: '',
    password: '',
    confirmPassword: ''
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={() => {
        // Handle form submission
      }}
    >
      {() => (
        <SigninForm>
          <FormItem>
            <label htmlFor="name">name</label>
            <Field id="name" name="name" type="name" />
            <ErrorMessage name="name" />
          </FormItem>

          <FormItem>
            <label htmlFor="password">Password</label>
            <Field id="password" name="password" type="password" />
            <ErrorMessage name="password" />
          </FormItem>
          <FormItem>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field id="confirmPassword" name="confirmPassword" type="password" />
            <ErrorMessage name="confirmPassword" />
          </FormItem>

          <ButtonsContainer>
            <Link to={APP_KEYS.ROUTER_KEYS.ROOT}>
              <Button text="Back" />
            </Link>
            <Button text="Submit" />
          </ButtonsContainer>
        </SigninForm>
      )}
    </Formik>
  );
};
