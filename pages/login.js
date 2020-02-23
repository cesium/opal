import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import theme from '../components/theme';
import Layout from '../components/Layout';
import TopSection from '../components/TopSection';
import { FormGrid, FormItem } from '../components/moonstone/Form';
import { isJWTValid, updateLocalStorage } from '../utils/apiRequests';
import CenteredCircularProgress from '../components/CenteredCircularProgress';
import CustomTextField from '../components/CustomTextField';

const Login = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const [isUserValid, setIsUserValid] = useState(true);

  useEffect(() => {
    isJWTValid(localStorage.jwt).then((userValid) => {
      setIsUserValid(userValid);
      if (userValid) Router.push('/404');
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
        () => {
          localStorage.clear();
          Router.push('/');
        },
      )
      .then(
        (res) => {
          if (res.jwt) {
            setErrorMsg('');
            updateLocalStorage(res.jwt, setIsLoading, setErrorMsg);
            setIsLoading(false);
            Router.push('/');
          } else if (res.error) {
            setIsLoading(false);
            setErrorMsg('Invalid email or password');
          }
        },
        () => {
          localStorage.clear();
          Router.push('/');
        },
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
              <CustomTextField
                required
                label="Email Address"
                type="email"
                variant="outlined"
                fullWidth
                onChange={handleEmailChange}
              />
            </FormItem>
            <FormItem>
              <CustomTextField
                required
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
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
                Sign In
              </Button>
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
