import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import Button from '../Button';
import { ButtonsContainer, FormItem, LoginForm } from './Login.styled';
import { APP_KEYS } from '../../consts';

const formSchema = yup.object().shape({
  name: yup.string().max(20, '20 charecters or less').required('Name is required'),
  password: yup.string().required('Required')
});
const initialValues = {
  name: '',
  password: ''
};

export const LoginComponent = () => (
  <Formik
    initialValues={initialValues}
    validationSchema={formSchema}
    onSubmit={() => {
      // Handle form submission
    }}
  >
    {() => (
      <LoginForm>
        <FormItem>
          <label htmlFor="name">name</label>
          <Field name="name" type="name" />
          <ErrorMessage name="name" />
        </FormItem>

        <FormItem>
          <label htmlFor="password">Password</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" />
        </FormItem>

        <ButtonsContainer>
          <Link to={APP_KEYS.ROUTER_KEYS.ROOT}>
            <Button text="Back" />
          </Link>
          <Button text="Submit" />
        </ButtonsContainer>
      </LoginForm>
    )}
  </Formik>
);
