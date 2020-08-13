import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import TopSection from '../components/TopSection';
import theme from '../components/theme';
import { FormGrid, FormItem } from '../components/moonstone/Form';
import { isJWTValid } from '../utils/apiRequests';
import CenteredCircularProgress from '../components/CenteredCircularProgress';

export default function Reset() {
  const router = useRouter();
  const { token } = router.query;

  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [isUserValid, setIsUserValid] = useState(true);

  useEffect(() => {
    if (localStorage.jwt) {
      isJWTValid(localStorage.jwt).then((userValid) => {
        setIsUserValid(userValid);
        if (userValid) router.push('/404');
      });
    } else {
      setIsUserValid(false);
    }
  }, [router]);

  const useResetForm = (callback) => {
    const [inputs, setInputs] = useState({
      password: '',
      // eslint-disable-next-line camelcase
      password_confirmation: '',
    });
    const handleSubmit = (event) => {
      if (event) {
        event.preventDefault();
      }
      callback();
    };
    const handleInputChange = (event) => {
      event.persist();
      setInputs({
        ...inputs,
        [event.target.name]: event.target.value,
      });
    };
    return {
      handleSubmit,
      handleInputChange,
      inputs,
    };
  };

  const reset = () => {
    // eslint-disable-next-line no-use-before-define
    const payload = { user: { password: inputs.password } };
    const apiEndpoint = `${process.env.ENDPOINT}${process.env.API_AUTH_RESET_PASSWORD}/${token}`;
    setIsLoading(true);
    fetch(apiEndpoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.errors) {
          setErrorMsg(res.errors[0].detail);
          setIsLoading(false);
        } else {
          setErrorMsg('');
          router.push('/');
        }
      });
  };

  const { inputs, handleInputChange, handleSubmit } = useResetForm(reset);

  const isPasswordShort = inputs.password
    ? String(inputs.password).length < 8
    : false;
  const doPasswordsMatch = inputs.password_confirmation
    ? String(inputs.password) === String(inputs.password_confirmation)
    : true;

  return (
    <Layout>
      {!isUserValid ? (
        <>
          <TopSection
            text="Definir palavra-passe"
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
                id="password"
                name="password"
                label="Nova palavra-passe"
                type="password"
                autoComplete="current-password"
                onChange={handleInputChange}
                value={inputs.password}
                variant="outlined"
                error={isPasswordShort}
                required
                fullWidth
              />
              {isPasswordShort ? (
                <Typography component="h1" variant="subtitle2" color="error">
                  A palavra-passe tem de ter, no mínimo, 8 carateres.
                </Typography>
              ) : null}
            </FormItem>
            <FormItem>
              <TextField
                id="password_confirmation"
                name="password_confirmation"
                label="Confirmar palavra-passe"
                type="password"
                autoComplete="current-password"
                onChange={handleInputChange}
                value={inputs.password_confirmation}
                error={!doPasswordsMatch}
                variant="outlined"
                required
                fullWidth
              />
              {doPasswordsMatch ? null : (
                <Typography component="h1" variant="subtitle2" color="error">
                  As palavras-passe não coincidem.
                </Typography>
              )}
            </FormItem>
            <FormItem>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={
                  isLoading ||
                  !inputs.password ||
                  !inputs.password_confirmation ||
                  isPasswordShort ||
                  !doPasswordsMatch
                }
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

Reset.getInitialProps = ({ query }) => ({ query });
