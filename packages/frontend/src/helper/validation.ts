import * as yup from 'yup';

export const formSchemaSignIn = yup.object().shape({
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

export const formSchemaAddTodo = yup.object().shape({
  title: yup.string().max(40, '40 charecters or less').required('required'),
  description: yup.string().required('Required')
});

export const formSchemaEditTodo = yup.object().shape({
  title: yup.string().max(40, '40 charecters or less').required('required'),
  description: yup.string().required('Required')
});

export const formSchemaEditUser = yup.object().shape({
  password: yup.string().max(40, '40 charecters or less').required('required')
});

export const formSchemaLogin = yup.object().shape({
  email: yup
    .string()
    .max(40, '40 charecters or less')
    .email('Must be a valid email')
    .required('required'),
  password: yup.string().required('Required')
});

export const formSchemaPassword = yup.object().shape({
  email: yup
    .string()
    .max(40, '40 charecters or less')
    .email('Must be a valid email')
    .required('required')
});
