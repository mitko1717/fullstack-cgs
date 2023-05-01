import React from 'react';
import { Grid, FormControl, InputLabel, Input } from '@material-ui/core';
import { Field } from 'formik';

interface Props {
  value: string;
  formik: any;
}

const GridComponent: React.FC<Props> = ({ formik, value }) => (
  <Grid item xs={12}>
    <FormControl fullWidth error={formik.touched[value] && Boolean(formik.errors[value])}>
      <InputLabel htmlFor={value}>{value}</InputLabel>
      <Field
        name={value}
        value={formik.values[value]}
        type={value}
        as={Input}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      {formik.errors[value] && formik.touched[value] && (
        <div style={{ color: 'red' }}>{formik.errors[value]}</div>
      )}
    </FormControl>
  </Grid>
);

export default GridComponent;
