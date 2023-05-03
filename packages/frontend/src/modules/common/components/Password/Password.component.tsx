import React from 'react';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { useMutation } from 'react-query';
import { toast } from 'react-hot-toast';
import { ButtonComponent } from '../Button';
import { PasswordForm } from './Password.styled';
import { APP_KEYS } from '../../consts';
import GridComponent from '../GridContainer';
import { useOnChangedPasswordSuccess } from '../../../../helper/onSuccess';
import userService from '../../../../service/user.service';

export const PasswordComponent = () => {
  const user = useMutation((email: string) => userService.getUserByEmail(email), {
    onSuccess: () => {
      toast.success('user found!');
    },
    onError: () => {
      toast.error('user with this email wasnt found!');
    }
  });

  const NEW_PASSWORD = `newpassword${Math.floor(Math.random() * (999 - 100 + 1) + 100).toString()}`;

  const onChangedPassword = useOnChangedPasswordSuccess();
  const passwordChange = useMutation(
    (email: string) => userService.changePasswordByAdmin({ email, password: NEW_PASSWORD }),
    {
      onSuccess: () => {
        onChangedPassword();
        toast.success('password was successfully changed and sent on ur mail! u can log in');
      },
      onError: () => {
        toast.error('something went wrong!');
      }
    }
  );

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .max(40, '40 charecters or less')
      .email('Must be a valid email')
      .required('required')
  });

  const initialValues = {
    email: ''
  };

  const handleSubmit = async (email: string) => {
    await user.mutateAsync(email);
    await passwordChange.mutateAsync(email);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: formSchema,
    onSubmit: (values) => handleSubmit(values.email)
  });

  return (
    <Formik initialValues={initialValues} validationSchema={formSchema} onSubmit={() => {}}>
      <PasswordForm onSubmit={formik.handleSubmit}>
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
      </PasswordForm>
    </Formik>
  );
};
