import React from 'react';
import { Grid, AppBar, Box, Typography } from '@material-ui/core/';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import Favorite from '@material-ui/icons/Favorite';
import SocialIcons from './SocialIcons';
import Link from './Link';

const PaddingBox = styled(Box)({
  padding: 3,
});

const CenteredBox = styled(PaddingBox)({
  display: 'flex',
  justifyContent: 'center',
});

const StyledAppBar = styled(AppBar)({
  position: 'absolute',
  bottom: 0,
});

const WithLove = () => (
  <Grid item xs={12}>
    <CenteredBox mb={1}>
      <Typography>made with </Typography>
      <Favorite color="error">Love</Favorite>
      <Link href="https://cesium.di.uminho.pt">
        <Typography> by CeSIUM</Typography>
      </Link>
    </CenteredBox>
  </Grid>
);

const Footer = ({ facebook, twitter, instagram, github, medium }) => (
  <StyledAppBar color="secondary" position="relative">
    <Grid container justify="center" alignItems="center">
      <SocialIcons
        facebook={facebook}
        twitter={twitter}
        github={github}
        instagram={instagram}
        medium={medium}
        color="white"
      />
      <WithLove />
    </Grid>
  </StyledAppBar>
);

Footer.propTypes = {
  facebook: PropTypes.string.isRequired,
  twitter: PropTypes.string.isRequired,
  instagram: PropTypes.string.isRequired,
  github: PropTypes.string.isRequired,
  medium: PropTypes.string.isRequired,
};

export default Footer;
