import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { TextField, Button, Typography, styled } from '@material-ui/core';
import TopSection from '../components/TopSection';
import Layout from '../components/Layout';
import { FormGrid, FormItem } from '../components/moonstone/Form';
import Modal from '../components/moonstone/Modal';
import theme from '../components/theme';
import { isJWTValid, checkUserType } from '../utils/apiRequests';
import { pushErrorPage } from '../utils/errorManagement';
import CenteredCircularProgress from '../components/CenteredCircularProgress';

export default function Referrals() {
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [modal, setModal] = useState(false);
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

  const redeemBadge = () => {
    setLoading(true);
    const endpoint = `${process.env.ENDPOINT}${process.env.API_REFERRALS}/${badgeID}`;
    fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.jwt}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.errors.unique_attendee_badge) {
          setError(res.errors.unique_attendee_badge);
        } else if (res.referral) {
          setSuccess(res.redeem);
          setModal(true);
        } else {
          setError('Código não disponível');
        }
        setLoading(false);
      });
  };

  const handleBadgeID = (event) => {
    event.persist();
    badgeID = event.target.value;
  };

  const StyledTypography = styled(Typography)({
    color: theme.palette.text.body,
  });

  return (
    <Layout>
      {isAllowed ? (
        <>
          <Modal open={modal} onClose={() => setModal(false)} noPadding>
            <StyledTypography variant="body">{success}</StyledTypography>
          </Modal>
          <TopSection
            text="Redimir badge"
            color={theme.palette.primary.main}
            title
            pageTitle
          />
          <FormGrid
            errorMessage={error}
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
          </FormGrid>
        </>
      ) : (
        <CenteredCircularProgress />
      )}
    </Layout>
  );
}
