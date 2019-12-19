import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Typography, Avatar, Box, Grid } from '@material-ui/core';
import {
  faFacebook,
  faTwitter,
  faGithub,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import PropTypes from 'prop-types';
import SocialLink from './SocialLink';

const Image = styled(Avatar)({
  width: 200,
  height: 200,
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '0.7em',
});

const TextBox = styled(Typography)({
  color: 'white',
  overflow: 'hidden',
  fontWeight: 'bold',
  textAlign: 'center',
});

const Person = ({
  img,
  name,
  university,
  facebook,
  twitter,
  linkedin,
  github,
}) => (
  <Grid
    container
    direction="column"
    justify="center"
    alignItems="center"
  >
    <Grid item>
      <Image src={img} />
    </Grid>
    <Grid item>
      <TextBox variant="h5">{name}</TextBox>
    </Grid>
    <Grid item>
      <TextBox variant="h6">{university}</TextBox>
    </Grid>
    <Grid
      item
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      {facebook ? (
        <Grid item>
          <SocialLink
            icon={faFacebook}
            url={`https://www.facebook.com/${facebook}`}
          />
        </Grid>
      ) : null}
      {twitter ? (
        <Grid item>
          <SocialLink
            icon={faTwitter}
            url={`https://www.twitter.com/${twitter}`}
          />
        </Grid>
      ) : null}
      {linkedin ? (
        <Grid item>
          <SocialLink
            icon={faLinkedin}
            url={`https://www.linkedin.com/in/${linkedin}/`}
          />
        </Grid>
      ) : null}
      {github ? (
        <Grid item>
          <SocialLink
            icon={faGithub}
            url={`https://www.github.com/${github}`}
          />
        </Grid>
      ) : null}
    </Grid>
  </Grid>
);

Person.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  university: PropTypes.string.isRequired,
  linkedin: PropTypes.string,
  twitter: PropTypes.string,
  github: PropTypes.string,
  facebook: PropTypes.string,
};

export default Person;
