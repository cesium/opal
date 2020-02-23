import React from 'react';
import {
  Grid,
  Typography,
  styled,
  Box,
  CircularProgress,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import theme from '../theme';

const Content = styled(Box)(({ noPadding, noMargin, fullWidth, signup }) => ({
  paddingTop: noPadding ? 'none' : theme.spacing(10),
  margin: noMargin ? 'none' : 'auto',
  height: signup ? '670px' : 'initial',
  [theme.breakpoints.up('xs')]: {
    width: fullWidth ? '100%' : '90%',
  },
  [theme.breakpoints.up('sm')]: {
    width: fullWidth ? '100%' : '70%',
  },
  [theme.breakpoints.up('md')]: {
    width: fullWidth ? '100%' : '50%',
  },
  [theme.breakpoints.up('lg')]: {
    width: fullWidth ? '100%' : '35%',
  },
  [theme.breakpoints.up('xl')]: {
    width: fullWidth ? '100%' : '30%',
  },
}));

export function FormGrid({
  children,
  isLoading,
  errorMessage,
  handleSubmit,
  noPadding,
  noMargin,
  fullWidth,
  signup,
}) {
  return (
    <Content
      signup={signup}
      noPadding={noPadding}
      noMargin={noMargin}
      fullWidth={fullWidth}
    >
      <form noValidate onSubmit={handleSubmit} autoComplete>
        <Grid
          container
          direction="column"
          justify="center"
          alignContent
          alignItems="stretch"
          spacing={2}
        >
          {children}
        </Grid>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={4}
        >
          {isLoading ? (
            <Grid item>
              <CircularProgress />
            </Grid>
          ) : null}
          <Grid item>
            <Typography component="h1" variant="subtitle2" color="error">
              {errorMessage}
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Content>
  );
}

export function FormItem({ children }) {
  return <Grid item>{children}</Grid>;
}

FormGrid.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  noPadding: PropTypes.bool,
  signup: PropTypes.bool,
  noMargin: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

FormItem.propTypes = {
  children: PropTypes.node.isRequired,
};
