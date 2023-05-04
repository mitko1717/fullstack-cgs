import React from 'react';
import { Formik, useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { Alert, Box, CircularProgress, Grid, Typography } from '@mui/material';
import { toast } from 'react-hot-toast';
import { EditTodoForm } from './EditUser.styled';
import { ButtonComponent } from '../Button';
import { IUser } from '../../../../interfaces/interface';
import { useOnLogoutSuccess } from '../../../../helper/onSuccess';
import { APP_KEYS } from '../../consts';
import GridComponent from '../GridContainer';
import userService from '../../../../service/user.service';
import Layout from '../Layout';
import { QUERY_KEYS, STORAGE_KEYS } from '../../consts/app-keys.const';
import { initialValuesEditForm } from '../../types/InitialValuesForms';
import { formSchemaEditUser } from '../../../../helper/validation';

export const EditUserComponent = () => {
  const email = localStorage.getItem(STORAGE_KEYS.EMAIL) || 'diman12345677@gmail.com';

  const { data, isLoading, isError } = useQuery<IUser>([QUERY_KEYS.USER, email], async () => {
    const user = await userService.getUserByEmail(email);
    return user;
  });

  const onLogoutSuccess = useOnLogoutSuccess();
  const logout = useMutation(() => userService.logoutUser(), {
    onSuccess: () => {
      onLogoutSuccess();
      toast.success('Log out successfully!');
    },
    onError: () => {
      toast.error('Some error occurred!');
    }
  });

  const passwordChange = useMutation(
    (password: string) => userService.changePassword({ email, password }),
    {
      onSuccess: () => {
        toast.success('password was successfully changed and sent on ur mail!');
      },
      onError: () => {
        toast.error('something went wrong!');
      }
    }
  );

  const handleSubmit = (password: string) => {
    passwordChange.mutate(password);
  };

  const formik = useFormik({
    initialValues: initialValuesEditForm,
    validationSchema: formSchemaEditUser,
    onSubmit: (values) => handleSubmit(values.password)
  });

  if (isLoading) {
    return (
      <Layout>
        <CircularProgress />
      </Layout>
    );
  }
  if (isError) {
    return (
      <Layout>
        <Alert severity="error">Error fetching data happened!</Alert>
      </Layout>
    );
  }

  return (
    <Layout>
      <Grid sx={{ m: 2, p: 2 }}>
        {data && (
          <Grid container spacing={2}>
            <Typography align="center" sx={{ width: 1, p: 2 }}>
              USER ID: {data.id}
            </Typography>
            <Typography align="center" sx={{ width: 1, p: 2 }}>
              EMAIL: {data.email}
            </Typography>
          </Grid>
        )}
      </Grid>
      <Formik
        initialValues={initialValuesEditForm}
        validationSchema={formSchemaEditUser}
        onSubmit={() => {}}
      >
        <EditTodoForm onSubmit={formik.handleSubmit}>
          <Typography align="center" sx={{ width: 1, p: 2, fontWeight: 'bold' }}>
            if u want to set new password
          </Typography>
          <Box m={3}>
            <Grid container spacing={2}>
              {Object.keys(initialValuesEditForm).map((key) => (
                <GridComponent key={key} value={key} formik={formik} />
              ))}
              <Grid item xs={12} justifyContent="space-between" display="flex">
                <Link to={APP_KEYS.ROUTER_KEYS.CONTENT}>
                  <ButtonComponent>Back</ButtonComponent>
                </Link>
                <ButtonComponent type="submit">Submit</ButtonComponent>
              </Grid>
            </Grid>
          </Box>
        </EditTodoForm>
      </Formik>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <ButtonComponent onClick={() => logout.mutate()}>LOG OUT</ButtonComponent>
      </Box>
    </Layout>
  );
};
