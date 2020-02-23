import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  input: {
    '&:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px #437C90 inset',
    },
  },
};

const CustomTextField = ({
  classes,
  variant,
  fullWidth,
  type,
  label,
  autoComplete,
  onChange,
  required,
}) => {
  return (
    <TextField
      variant={variant}
      fullWidth={fullWidth}
      type={type}
      inputProps={{ className: classes.input }}
      label={label}
      autoComplete={autoComplete}
      onChange={onChange}
      required={required}
    />
  );
};

export default withStyles(styles)(CustomTextField);

CustomTextField.propTypes = {
  classes: PropTypes.object,
  type: PropTypes.string,
  label: PropTypes.string,
  autoComplete: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  variant: PropTypes.string,
};
