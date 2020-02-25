import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Paper, styled, Grid, Typography, Button } from '@material-ui/core';
import fetch from 'isomorphic-unfetch';
import theme from '../../components/theme';
import Layout from '../../components/Layout';
import TopSection from '../../components/TopSection';
import { isJWTValid, checkUserType } from '../../utils/apiRequests';
import { pushErrorPage } from '../../utils/errorManagement';
import CenteredCircularProgress from '../../components/CenteredCircularProgress';
import Link from '../../components/Link';

const StyledPaper = styled(Paper)({
  backgroundColor: theme.palette.primary.light,
  marginTop: '3rem',
  padding: '3rem',
  textAlign: 'center',
  width: '100%',
});

const StyledTypography = styled(Typography)({
  color: theme.palette.text.title,
});

const StyledButton = styled(Button)({
  margin: 'auto',
});

export default function Result() {
  const router = useRouter();
  const [isDone, setIsDone] = useState(false);
  const [message, setMessage] = useState(false);

  function attributeBadge(badgeID) {
    const endpoint = `${process.env.ENDPOINT}${process.env.API_REFERRALS}`;
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        id: badgeID,
      }),
    })
      .then((res) => res.json())
      .then(
        (res) => {
          if (res.errors) {
            if (res.errors.unique_attendee_badge) {
              setMessage(res.errors.unique_attendee_badge);
            } else {
              setMessage('Bad request');
            }
          } else {
            setMessage(res.referral);
          }
          setIsDone(true);
        },
        () => pushErrorPage('Bad request', 'referral_bad_request'),
      );
  }

  useEffect(() => {
    if (router.query.id !== undefined) {
      const badgeID = router.query.id;
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
                attributeBadge(badgeID);
                break;
            }
          });
        }
      });
    }
  }, [router]);

  return (
    <Layout>
      <TopSection
        text="Redimir badge"
        color={theme.palette.primary.main}
        title
        pageTitle
      />
      {isDone ? (
        <Grid container direction="column" alignItems="center" spacing={7}>
          <Grid item>
            <StyledPaper color="primary">
              <StyledTypography variant="h4">{message}</StyledTypography>
            </StyledPaper>
          </Grid>
          <Grid item>
            <Link href="/referrals">
              <StyledButton variant="contained" color="primary">
                Inserir Badge ID manualmente
              </StyledButton>
            </Link>
          </Grid>
        </Grid>
      ) : (
        <CenteredCircularProgress />
      )}
    </Layout>
  );
}
