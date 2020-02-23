import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, styled } from '@material-ui/core';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import theme from '../components/theme';
import Link from '../components/Link';
import Layout from '../components/Layout';
import TopSection from '../components/TopSection';
import { FormGrid, FormItem } from '../components/moonstone/Form';
import { isJWTValid, updateLocalStorage } from '../utils/apiRequests';
import CenteredCircularProgress from '../components/CenteredCircularProgress';
import { pushErrorPage } from '../utils/errorManagement';

const StyledTypography = styled(Typography)({
  textAlign: 'center',
});

const Login = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const [isUserValid, setIsUserValid] = useState(true);

  useEffect(() => {
    isJWTValid(localStorage.jwt).then((userValid) => {
      setIsUserValid(userValid);
      if (userValid) pushErrorPage('Unauthorized', 'login_user_valid');
    });
  }, []);

  const useSignInForm = (callback) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (event) => {
      if (event) {
        event.preventDefault();
      }
      callback();
    };
    const handleEmailChange = (event) => {
      event.persist();
      setEmail(event.target.value);
    };
    const handlePasswordChange = (event) => {
      event.persist();
      setPassword(event.target.value);
    };
    return {
      email,
      password,
      handleSubmit,
      handleEmailChange,
      handlePasswordChange,
    };
  };

  function finishLogin(jwt, _callback) {
    updateLocalStorage(jwt, setIsLoading, setErrorMsg);
    _callback();
  }

  const login = () => {
    setIsLoading(true);
    setErrorMsg('');
    localStorage.clear();
    const apiEndpoint = process.env.ENDPOINT + process.env.API_AUTH_SIGN_IN;
    fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // eslint-disable-next-line no-use-before-define
        email,
        // eslint-disable-next-line no-use-before-define
        password,
      }),
    })
      .then(
        (res) => res.json(),
        () => pushErrorPage('Unauthorized', 'signup_user_valid'),
      )
      .then(
        (res) => {
          if (res.jwt) {
            setErrorMsg('');
            setIsLoading(false);
            finishLogin(res.jwt, () => Router.push('/profile'));
          } else if (res.error) {
            setIsLoading(false);
            setErrorMsg('Invalid email or password');
          }
        },
        () => pushErrorPage('Unauthorized', 'signup_user_valid'),
      );
  };

  const {
    email,
    password,
    handleSubmit,
    handleEmailChange,
    handlePasswordChange,
  } = useSignInForm(login);

  return (
    <Layout>
      {!isUserValid ? (
        <>
          <TopSection
            text="login"
            color={theme.palette.primary.main}
            title
            pageTitle
          />
          <FormGrid
            errorMessage={errorMsg}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
          >
            <FormItem>
              <TextField
                required
                label="Email Address"
                type="email"
                variant="outlined"
                fullWidth
                autoComplete="email"
                onChange={handleEmailChange}
              />
            </FormItem>
            <FormItem>
              <TextField
                required
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                autoComplete="current-password"
                onChange={handlePasswordChange}
              />
            </FormItem>
            <FormItem>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                LOGIN
              </Button>
            </FormItem>
            <FormItem>
              <Link href="/password_recovery">
                <StyledTypography variant="body1">
                  Esqueci-me da palavra-passe
                </StyledTypography>
              </Link>
            </FormItem>
          </FormGrid>
        </>
      ) : (
        <CenteredCircularProgress />
      )}
    </Layout>
  );
};

export default Login;
