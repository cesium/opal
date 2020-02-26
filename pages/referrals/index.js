import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { TextField, Button, styled } from '@material-ui/core';
import TopSection from '../../components/TopSection';
import Layout from '../../components/Layout';
import { FormGrid, FormItem } from '../../components/moonstone/Form';
import theme from '../../components/theme';
import { isJWTValid, checkUserType } from '../../utils/apiRequests';
import { pushErrorPage } from '../../utils/errorManagement';
import CenteredCircularProgress from '../../components/CenteredCircularProgress';

export default function Referrals() {
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [isAllowed, setIsAllowed] = useState(false);
  let badgeID = '';

  useEffect(() => {
    isJWTValid(localStorage.jwt).then((valid) => {
      if (!valid) {
        pushErrorPage('Unauthorized', 'check_referrals');
      } else {
        checkUserType(localStorage.jwt).then((userType) => {
          switch (userType) {
            case 'company':
              pushErrorPage('Unauthorized', 'no_referrals_company');
              break;
            default:
              setIsAllowed(true);
              break;
          }
        });
      }
    });
  }, []);

  const redeemBadge = (event) => {
    if (event) {
      event.preventDefault();
    }
    setLoading(true);
    setError('');
    setSuccess('');
    const endpoint = `${process.env.ENDPOINT}${process.env.API_REFERRALS}`;
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.jwt}`,
      },
      body: JSON.stringify({
        id: badgeID,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.errors) {
          if (res.errors.unique_attendee_badge)
            setError(res.errors.unique_attendee_badge);
        } else if (res.referral) {
          setSuccess(res.referral);
        } else {
          setError('Código não disponível');
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError('Erro: Check the bottom of the sea');
      });
  };

  const handleBadgeID = (event) => {
    event.persist();
    badgeID = event.target.value;
  };

  const CenteredImage = styled('img')({
    width: '100%',
    margin: 'auto',
    marginBottom: '100px',
  });

  return (
    <Layout>
      {isAllowed ? (
        <>
          <TopSection
            text="Redimir badge"
            color={theme.palette.primary.main}
            title
            pageTitle
          />
          <FormGrid
            errorMessage={error}
            successMessage={success}
            isLoading={isLoading}
            handleSubmit={redeemBadge}
          >
            <FormItem>
              <TextField
                required
                label="Badge ID"
                type="text"
                onChange={handleBadgeID}
                variant="outlined"
                fullWidth
              />
            </FormItem>
            <FormItem>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Enviar
              </Button>
            </FormItem>
            <FormItem>
              <CenteredImage src="/img/referral_example.png" alt="" />
            </FormItem>
          </FormGrid>
        </>
      ) : (
        <CenteredCircularProgress />
      )}
    </Layout>
  );
}
