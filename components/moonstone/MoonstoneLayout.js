import React from 'react';
import { Grid, Box, Button, AppBar, Toolbar } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Layout from '../Layout';
import TopSection from '../TopSection';
import theme from '../theme';
import Link from '../Link';

const StyledBox = styled(Box)({
  paddingTop: '60px',
  paddingBottom: '100px',
  backgroundColor: theme.palette.secondary.main,
  overflow: 'hidden',
});

const StyledToolbar = styled(Toolbar)({
  backgroundColor: theme.palette.primary.light,
});

const Entry = styled(Button)({
  margin: '1rem',
  marginTop: '0.5rem',
  marginBottom: '0.5rem',

  color: theme.palette.text.title,
  '&:hover': {
    backgroundColor: theme.navbar.entryBackgroundColor,
  },
});

export default function MoonstoneLayout({
  showMenu,
  title,
  children,
  isCompany,
}) {
  const logout = () => {
    localStorage.clear();
    Router.push('/');
  };

  return (
    <Layout>
      <TopSection
        text={title}
        color={theme.palette.primary.main}
        title
        pageTitle
      />
      {showMenu && (
        <AppBar color="default" position="relative">
          <StyledToolbar>
            <Grid container justify="center" alignItems="center">
              <Grid item>
                <Link href="/profile">
                  <Entry color="primary">Perfil</Entry>
                </Link>
              </Grid>
              {!isCompany && (
                <>
                  <Grid item>
                    <Link href="/badgedex">
                      <Entry color="primary">Badgedex</Entry>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/leaderboard">
                      <Entry color="primary">Leaderboard</Entry>
                    </Link>
                  </Grid>
                </>
              )}
              <Grid item>
                <Entry onClick={() => logout()} color="primary">
                  Logout
                </Entry>
              </Grid>
            </Grid>
          </StyledToolbar>
        </AppBar>
      )}
      <StyledBox>{children}</StyledBox>
    </Layout>
  );
}

MoonstoneLayout.propTypes = {
  title: PropTypes.string.isRequired,
  showMenu: PropTypes.bool,
  isCompany: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
