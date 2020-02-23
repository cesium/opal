/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import TopSection from '../components/TopSection';
import theme from '../components/theme';
import { FormGrid, FormItem } from '../components/moonstone/Form';
import { isJWTValid, updateLocalStorage } from '../utils/apiRequests';
import CenteredCircularProgress from '../components/CenteredCircularProgress';
import { pushErrorPage } from '../utils/errorManagement';

export default function SignUp() {
  const router = useRouter();

  const [errorMsg, setErrorMsg] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const [isUserValid, setIsUserValid] = useState(true);

  useEffect(() => {
    isJWTValid(localStorage.jwt).then((userValid) => {
      setIsUserValid(userValid);
      if (userValid) pushErrorPage('Unauthorized', 'signup_user_valid');
    });
  }, []);

  const useSignUpForm = (callback) => {
    const [attendee, setAttendee] = React.useState({
      id: router.query.id,
      nickname: '',
      firstName: '',
      lastName: '',
    });
    const [inputs, setInputs] = React.useState({
      email: '',
      password: '',
      // eslint-disable-next-line camelcase
      password_confirmation: '',
      attendee: '',
    });
    const handleSubmit = (event) => {
      if (event) {
        event.preventDefault();
      }
      callback();
    };
    const handleAttendeeChange = (event) => {
      event.persist();
      setAttendee({
        ...attendee,
        [event.target.name]: event.target.value,
      });
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
      handleAttendeeChange,
      inputs,
      attendee,
    };
  };

  function finishLogin(jwt, _callback) {
    updateLocalStorage(jwt, setIsLoading, setErrorMsg);
    _callback();
  }

  const signup = () => {
    // eslint-disable-next-line no-use-before-define
    setIsLoading(true);
    localStorage.clear();
    const attendeeData = {
      id: attendee.id,
      nickname: attendee.nickname,
      name: [attendee.firstName, attendee.lastName].join(' '),
    };
    const signupData = { user: { ...inputs, attendee: attendeeData } };
    const apiEndpoint = process.env.ENDPOINT + process.env.API_AUTH_SIGN_UP;
    fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.jwt) {
          localStorage.clear();
          setErrorMsg('');
          finishLogin(res.jwt, () => router.push('/profile'));
        } else if (res.error) {
          setErrorMsg(res.error);
          setIsLoading(false);
        } else if (res.errors.detail) {
          setErrorMsg(res.errors.detail);
          setIsLoading(false);
        }
      });
  };

  const {
    inputs,
    attendee,
    handleInputChange,
    handleAttendeeChange,
    handleSubmit,
  } = useSignUpForm(signup);

  const isNameValid = (name) => {
    if (name)
      return (
        String(name).length > 1 &&
        String(name).length < 16 &&
        String(name).match(
          /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð'-]+$/,
        )
      );
    return true;
  };
  const isNicknameValid = attendee.nickname
    ? String(attendee.nickname).length > 1 &&
      String(attendee.nickname).length < 16 &&
      String(attendee.nickname).match(
        /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-)[a-zA-Z0-9])*[a-zA-Z0-9]+$/,
      )
    : true;
  const isEmailValid = inputs.email
    ? // eslint-disable-next-line no-useless-escape
      String(inputs.email).match(/^([\w\.%\+\-]+)@([\w\-]+\.)+([\w]{2,})$/)
    : true;
  const isPasswordLong = inputs.password
    ? String(inputs.password).length > 8
    : true;
  const doPasswordsMatch = inputs.password_confirmation
    ? String(inputs.password) === String(inputs.password_confirmation)
    : true;

  return (
    <Layout>
      {!isUserValid ? (
        <>
          <TopSection
            text="signup"
            color={theme.palette.primary.main}
            title
            pageTitle
          />
          <FormGrid
            signup
            errorMessage={errorMsg}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
          >
            <FormItem>
              <TextField
                id="firstName"
                name="firstName"
                label="Nome"
                type="text"
                onChange={handleAttendeeChange}
                value={attendee.firstName}
                variant="outlined"
                required
                fullWidth
                autoFocus
                error={!isNameValid(attendee.firstName)}
              />
              {isNameValid(attendee.firstName) ? null : (
                <Typography component="h1" variant="subtitle2" color="error">
                  O nome não pode conter espaços, pontuação ou carateres
                  especiais.
                </Typography>
              )}
            </FormItem>
            <FormItem>
              <TextField
                id="lastName"
                name="lastName"
                label="Apelido"
                type="text"
                onChange={handleAttendeeChange}
                value={attendee.lastName}
                variant="outlined"
                required
                fullWidth
                autoFocus
                error={!isNicknameValid}
              />
              {isNameValid(attendee.lastName) ? null : (
                <Typography component="h1" variant="subtitle2" color="error">
                  O nome não pode conter espaços, pontuação ou carateres
                  especiais.
                </Typography>
              )}
            </FormItem>
            <FormItem>
              <TextField
                id="nickname"
                name="nickname"
                label="Nickname"
                autoComplete="nickname"
                type="text"
                onChange={handleAttendeeChange}
                value={attendee.nickname}
                variant="outlined"
                required
                fullWidth
                autoFocus
                error={!isNicknameValid}
              />
              {isNicknameValid ? null : (
                <Typography component="h1" variant="subtitle2" color="error">
                  O nickname tem de ter 2 a 15 carateres do tipo a-z e A-Z.
                </Typography>
              )}
            </FormItem>
            <FormItem>
              <TextField
                id="email"
                name="email"
                label="Email Address"
                type="email"
                onChange={handleInputChange}
                value={inputs.email}
                variant="outlined"
                error={!isEmailValid}
                required
                fullWidth
              />
              {isEmailValid ? null : (
                <Typography component="h1" variant="subtitle2" color="error">
                  O email não é válido.
                </Typography>
              )}
            </FormItem>
            <FormItem>
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={handleInputChange}
                value={inputs.password}
                variant="outlined"
                error={!isPasswordLong}
                required
                fullWidth
              />
              {isPasswordLong ? null : (
                <Typography component="h1" variant="subtitle2" color="error">
                  A palavra-passe tem de ter, no mínimo, 8 carateres.
                </Typography>
              )}
            </FormItem>
            <FormItem>
              <TextField
                id="password_confirmation"
                name="password_confirmation"
                label="Re-enter password"
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
                  !attendee.firstName ||
                  !attendee.lastName ||
                  !attendee.nickname ||
                  !inputs.email ||
                  !inputs.password ||
                  !inputs.password_confirmation ||
                  !isNameValid(attendee.firstName) ||
                  !isNameValid(attendee.lastName) ||
                  !isNicknameValid ||
                  !isEmailValid ||
                  !isPasswordLong ||
                  !doPasswordsMatch
                }
              >
                Sign Up
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

SignUp.getInitialProps = ({ query }) => ({ query });
