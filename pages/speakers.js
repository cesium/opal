import React from 'react';
import { Grid, Box } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import TopSection from '../components/TopSection';
import Layout from '../components/Layout';
import Speaker from '../components/Speaker';
import theme from '../static/theme';
import speakers from '../data/speakers';

const StyledBox = styled(Box)({
  backgroundColor: theme.palette.secondary.light,
  overflow: 'hidden',
  padding: '6em 6em',
});

const Speakers = () => (
  <Layout>
    <TopSection
      text="Oradores"
      color={theme.palette.secondary.main}
      title
      pageTitle
    />
    <StyledBox>
      <Grid container direction="row" justify="center" spacing={8}>
        {speakers.map((sp) => (
          <Grid item>
            <Speaker
              name={sp.name}
              img={sp.img}
              facebook={sp.facebook}
              twitter={sp.twitter}
              linkedin={sp.linkedin}
              github={sp.github}
              company={sp.company}
              title={sp.title}
              shortbio={sp.shortbio}
              website={sp.website}
            />
          </Grid>
        ))}
      </Grid>
    </StyledBox>
  </Layout>
);

export default Speakers;
