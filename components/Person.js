import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Typography, Avatar, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import SocialIcons from './SocialIcons';

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
  <Grid container direction="column" justify="center" alignItems="center">
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
      <SocialIcons
        facebook={facebook}
        twitter={twitter}
        github={github}
        linkedin={linkedin}
        color="white"
      />
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
