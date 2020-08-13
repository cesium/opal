import React from 'react';
import { styled } from '@material-ui/styles';
import { Grid, Box } from '@material-ui/core';
import Layout from '../components/Layout';
import TopSection from '../components/TopSection';
import Person from '../components/Person';
import Title from '../components/Title';
import theme from '../components/theme';
import team from '../data/team.json';

const StyledBox = styled(Box)({
  position: 'relative',
  paddingBottom: '100px',
  overflow: 'hidden',
  backgroundColor: theme.palette.secondary.light,
});

const StyledGrid = styled(Grid)({
  paddingTop: '20px',
  paddingLeft: '15%',
  paddingRight: '15%',
});

const Team = () => (
  <Layout>
    <TopSection
      text="Equipa"
      color={theme.palette.primary.main}
      title
      pageTitle
    />
    <StyledBox>
      {team.map((dept) => (
        <>
          <Title text={dept.team} title />
          <StyledGrid
            container
            direction="row"
            justify="center"
            alignItems="flexitem-start"
            spacing={5}
          >
            {dept.elements.map((elem) => (
              <Grid item xs={11} sm={6} md={4} lg={3}>
                <Person
                  name={elem.name}
                  img={`/img/team/${elem.img}`}
                  facebook={elem.facebook}
                  instagram={elem.instagram}
                  twitter={elem.twitter}
                  linkedin={elem.linkedin}
                  github={elem.github}
                />
              </Grid>
            ))}
          </StyledGrid>
        </>
      ))}
    </StyledBox>
  </Layout>
);

export default Team;
