import React from 'react';
import { Grid, Box } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import theme from '../components/theme';
import challenges from '../data/challenges.json';
import TopSection from '../components/TopSection';
import Challenge from '../components/Challenge';
import Layout from '../components/Layout';

const StyledBox = styled(Box)({
  backgroundColor: theme.palette.secondary.main,
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  overflow: 'hidden',
});

const Challenges = () => (
  <Layout>
    <TopSection
      text="Desafios e Prémios"
      color={theme.palette.primary.main}
      title
      pageTitle
    />
    <StyledBox>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={8}
      >
        {challenges.map((ch) => (
          <Grid item>
            <Challenge
              title={ch.title}
              desc={ch.description}
              prizes={ch.prizes}
              signup={ch.link ? ch.link : undefined}
            />
          </Grid>
        ))}
      </Grid>
    </StyledBox>
  </Layout>
);

export default Challenges;
