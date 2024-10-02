/* eslint-disable react/prop-types */
import { withStyles } from '@mui/system';
import TextField from '@mui/material/TextField';
import React from 'react';

const styles = {
  input: {
    '&:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px #437C90 inset',
    },
  },
};

const CustomTextField = ({
  classes,
  id,
  name,
  label,
  autoComplete,
  type,
  onChange,
  value,
  variant,
  required,
  fullWidth,
  autoFocus,
  error,
}) => {
  return (
    <TextField
      classes={classes}
      id={id}
      name={name}
      label={label}
      autoComplete={autoComplete}
      type={type}
      onChange={onChange}
      value={value}
      variant={variant}
      required={required}
      fullWidth={fullWidth}
      autoFocus={autoFocus}
      error={error}
    />
  );
};

export default withStyles(styles)(CustomTextField);
