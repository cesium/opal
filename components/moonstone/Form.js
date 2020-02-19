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

const Content = styled(Box)({
  paddingTop: theme.spacing(10),
  margin: 'auto',
  [theme.breakpoints.up('xs')]: {
    width: '90%',
  },
  [theme.breakpoints.up('sm')]: {
    width: '70%',
  },
  [theme.breakpoints.up('md')]: {
    width: '50%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '35%',
  },
  [theme.breakpoints.up('xl')]: {
    width: '30%',
  },
});

export function FormGrid({ children, isLoading, errorMessage, handleSubmit }) {
  return (
    <Content>
      <form noValidate onSubmit={handleSubmit}>
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
          <Grid item>{isLoading ? <CircularProgress /> : null}</Grid>
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
};

FormItem.propTypes = {
  children: PropTypes.node.isRequired,
};
