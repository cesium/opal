import React from 'react';
import { Grid, Box, Button } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import Layout from '../components/Layout';
import TopSection from '../components/TopSection';
import Person from '../components/Person';
import theme from '../components/theme';
import ambassadors from '../data/ambassadors.json';
import global from '../data/global.json';
import Link from '../components/Link';

const StyledBox = styled(Box)({
  paddingTop: '100px',
  paddingBottom: '100px',
  backgroundColor: theme.palette.secondary.main,
  overflow: 'hidden',
});

const StyledGrid = styled(Grid)({
  paddingLeft: '8%',
  paddingRight: '8%',
});

const StyledButton = styled(Button)({
  color: theme.palette.primary.main,
});

function sortBy(prop) {
  return function compare(a, b) {
    if (a[prop] > b[prop]) {
      return 1;
    }
    if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  };
}

const Ambassadors = () => (
  <Layout>
    <TopSection
      text="embaixadores"
      color={theme.palette.primary.main}
      title
      pageTitle
      contentUnderneath={global.ambassadors.allowingApplications}
    >
      {global.ambassadors.allowingApplications ? (
        <Grid container justify="center">
          <Grid item>
            <Link href={global.ambassadors.applicationsLink}>
              <StyledButton variant="contained" color="white" size="large">
                Torna-te embaixador
              </StyledButton>
            </Link>
          </Grid>
        </Grid>
      ) : null}
    </TopSection>
    <StyledBox>
      <StyledGrid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={10}
      >
        {ambassadors.sort(sortBy('university')).map((entry) => {
          return entry.elements.sort(sortBy('name')).map((ambassador) => (
            <Grid item xs={11} sm={6} md={4} lg={3}>
              <Person
                name={ambassador.name}
                university={entry.university}
                img={ambassador.img}
                facebook={ambassador.facebook}
                twitter={ambassador.twitter}
                linkedin={ambassador.linkedin}
                github={ambassador.github}
              />
            </Grid>
          ));
        })}
      </StyledGrid>
    </StyledBox>
  </Layout>
);

export default Ambassadors;
