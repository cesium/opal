/* eslint-disable react/prop-types */
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import React from 'react';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '&:-webkit-autofill': {
    WebkitBoxShadow: '0 0 0 1000px #437C90 inset',
  },
}));

const CustomTextField = ({
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
    <StyledTextField
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

export default CustomTextField;