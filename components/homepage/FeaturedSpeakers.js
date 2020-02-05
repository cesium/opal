import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import Person from '../Person';
import Link from '../Link';
import TopSection from '../TopSection';

const StyledGrid = styled(Grid)({
  paddingLeft: '8%',
  paddingRight: '8%',
});

const StyledButton = styled(Button)({
  marginTop: '3rem',
});

export default function FeaturedSpeakers({
  title,
  featured,
  color,
  backgroundImage,
}) {
  return (
    <TopSection
      title
      text={title.toUpperCase()}
      color={color}
      backgroundImage={backgroundImage}
      contentUnderneath
    >
      <StyledGrid
        container
        direction="row"
        justify="center"
        alignItems="flexitem-start"
        spacing={10}
      >
        {featured.map((speaker) => (
          <Grid item xs={11} sm={6} md={4} lg={3}>
            <Person
              name={speaker.name}
              img={speaker.img}
              facebook={speaker.facebook}
              twitter={speaker.twitter}
              linkedin={speaker.linkedin}
              github={speaker.github}
              company={speaker.company}
            />
          </Grid>
        ))}
      </StyledGrid>
      <Grid container justify="center">
        <Grid item>
          <Link href="/speakers">
            <StyledButton variant="contained" color="secondary" size="large">
              Ver todos
            </StyledButton>
          </Link>
        </Grid>
      </Grid>
    </TopSection>
  );
}

FeaturedSpeakers.propTypes = {
  title: PropTypes.string.isRequired,
  featured: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
    }),
  ).isRequired,
  color: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string,
};
