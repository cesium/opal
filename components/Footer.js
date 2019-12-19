import React from 'react';
import { Grid, AppBar, Box, Typography } from '@material-ui/core/';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import Favorite from '@material-ui/icons/Favorite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faGithub,
  faMedium,
} from '@fortawesome/free-brands-svg-icons';
import Link from './Link';
import theme from '../static/theme';

const PaddingBox = styled(Box)({
  padding: 3,
});

const CenteredBox = styled(PaddingBox)({
  display: 'flex',
  justifyContent: 'center',
});

const DynamicFontAwesomeIcon = styled(FontAwesomeIcon)((props) => ({
  color: 'white',
  '&:hover': {
    color: props.hover,
  },
}));

const StyledAppBar = styled(AppBar)({
  position: 'relative',
  bottom: 0,
});

const SocialLink = ({ icon, url }) => (
  <Grid item>
    <PaddingBox mt={1}>
      <Link href={url}>
        <DynamicFontAwesomeIcon
          icon={icon}
          size="2x"
          hover={theme.palette.secondary.light}
        />
      </Link>
    </PaddingBox>
  </Grid>
);

const WithLove = () => (
  <Grid item xs={12}>
    <CenteredBox mb={1}>
      <Typography>made with </Typography>
      <Favorite color="error" style={{ fontSize: 20 }}>
        Love
      </Favorite>
      <Typography> by CeSIUM</Typography>
    </CenteredBox>
  </Grid>
);

const Footer = ({ facebook, twitter, instagram, github, medium }) => (
  <StyledAppBar color="secondary" position="relative">
    <Grid container justify="center" alignItems="center">
      <SocialLink
        url={`https://www.facebook.com/${facebook}`}
        icon={faFacebook}
      />
      <SocialLink url={`https://www.twitter.com/${twitter}`} icon={faTwitter} />
      <SocialLink
        url={`https://www.instagram.com/${instagram}`}
        icon={faInstagram}
      />
      <SocialLink url={`https://www.github.com/${github}`} icon={faGithub} />
      <SocialLink url={`https://www.medium.com/${medium}`} icon={faMedium} />
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

SocialLink.propTypes = {
  icon: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
};

export default Footer;
