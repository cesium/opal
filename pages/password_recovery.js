import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import TopSection from '../components/TopSection';
import theme from '../components/theme';
import { FormGrid, FormItem } from '../components/moonstone/Form';
import { isJWTValid } from '../utils/apiRequests';
import CenteredCircularProgress from '../components/CenteredCircularProgress';

export default function RecoverPassword() {
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [isUserValid, setIsUserValid] = useState(true);

  useEffect(() => {
    isJWTValid(localStorage.jwt).then((userValid) => {
      setIsUserValid(userValid);
      if (userValid) router.push('/404');
    });
  }, []);

  const useResetForm = (callback) => {
    const [email, setEmail] = React.useState('');
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
    return {
      handleSubmit,
      handleEmailChange,
      email,
    };
  };

  const reset = () => {
    // eslint-disable-next-line no-use-before-define
    const payload = { user: { email } };
    const apiEndpoint = `${process.env.ENDPOINT}${process.env.API_AUTH_RESET_PASSWORD}`;
    setIsLoading(true);
    fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.errors) {
          setErrorMsg(res.errors.detail);
        } else {
          setErrorMsg(res.data.attributes.info);
        }
        setIsLoading(false);
      });
  };

  const { email, handleEmailChange, handleSubmit } = useResetForm(reset);

  return (
    <Layout>
      {!isUserValid ? (
        <>
          <TopSection
            text="Recuperar palavra-passe"
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
                id="email"
                name="email"
                label="Email"
                type="email"
                autoComplete="email"
                onChange={handleEmailChange}
                value={email}
                variant="outlined"
                required
                fullWidth
              />
            </FormItem>
            <FormItem>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isLoading || !email}
              >
                Enviar
              </Button>
            </FormItem>
          </FormGrid>
        </>
      ) : (
        <CenteredCircularProgress />
      )}
    </Layout>
  );
}
