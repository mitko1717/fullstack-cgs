import React from 'react';
import { Formik, useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { useMutation } from 'react-query';
import { toast } from 'react-hot-toast';
import { SigninForm } from './Signin.styled';
import { APP_KEYS } from '../../consts';
import { ButtonComponent } from '../Button';
import GridComponent from '../GridContainer';
import { ISignupData } from '../../types/Login.types';
import { useOnLoginSuccess } from '../../../../helper/onSuccess';
import userService from '../../../../service/user.service';
import { STORAGE_KEYS } from '../../consts/app-keys.const';
import { initialValuesSignIn } from '../../types/InitialValuesForms';
import { formSchemaSignIn } from '../../../../helper/validation';

export const SigninComponent = () => {
  const onSigninSuccess = useOnLoginSuccess();
  const signin = useMutation((formData: ISignupData) => userService.registerUser(formData), {
    onSuccess: (data, formData) => {
      localStorage.setItem(STORAGE_KEYS.TOKEN, `Bearer ${data}`);
      localStorage.setItem(STORAGE_KEYS.EMAIL, formData.email);
      onSigninSuccess();
      toast.success('signin successfully!');
    },
    onError: () => {
      toast.error('some error while signin!');
    }
  });

  const handleSubmit = (values: ISignupData) => {
    const formData: ISignupData = {
      email: values.email,
      password: values.password
    };
    signin.mutate(formData);
  };

  const formik = useFormik({
    initialValues: initialValuesSignIn,
    validationSchema: formSchemaSignIn,
    onSubmit: (values) => handleSubmit(values)
  });

  return (
    <Formik
      initialValues={initialValuesSignIn}
      validationSchema={formSchemaSignIn}
      onSubmit={() => {}}
    >
      <SigninForm onSubmit={formik.handleSubmit}>
        <Box m={3}>
          <Grid container spacing={2}>
            {Object.keys(initialValuesSignIn).map((key) => (
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
