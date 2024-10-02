import React from 'react';
import { Grid, Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import TopSection from '../components/TopSection';
import Layout from '../components/Layout';
import FAQ from '../components/FAQ';
import Link from '../components/Link';
import theme from '../components/theme';
import faqs from '../data/faqs.json';

const StyledBox = styled(Box)({
  backgroundColor: theme.palette.secondary.main,
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(10),
  overflow: 'hidden',
});

const StyledButton = styled(Button)({
  color: theme.palette.primary.main,
});

const FAQs = () => (
  <Layout>
    <TopSection
      text="Perguntas frequentes"
      color={theme.palette.primary.main}
      title
      pageTitle
      contentUnderneath
    >
      <Grid container justifyContent="center">
        <Grid item>
          <Link href="/docs/survival-guide.pdf">
            <StyledButton
              variant="contained"
              size="large"
              color="secondary"
              style={{ background: 'white' }}
            >
              Survival Guide
            </StyledButton>
          </Link>
        </Grid>
      </Grid>
    </TopSection>
    <StyledBox>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        {faqs.map((faq) => (
          <Grid item>
            <FAQ question={faq.question} answer={faq.answer} />
          </Grid>
        ))}
      </Grid>
    </StyledBox>
  </Layout>
);

export default FAQs;
