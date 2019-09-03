import React from 'react';
import {
  Grid,
  AppBar,
  Link,
  Box,
  Typography,
} from '@material-ui/core/';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import Favorite from '@material-ui/icons/Favorite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';


const PaddingBox = styled(Box)({
  padding: 1,
});

const CenteredBox = styled(PaddingBox)({
  display: 'flex',
  justifyContent: 'center',
});

const FooterBar = styled(AppBar)({
  position: 'static',
});

const SocialLink = ({ iconComp, social }) => (
  <Grid item>
    <PaddingBox mt={1}>
      <Link href={social}>
        <FontAwesomeIcon icon={iconComp} size="2x" color="white" />
      </Link>
    </PaddingBox>
  </Grid>
);

const WithLove = () => (
  <CenteredBox mb={1}>
    <Typography>made with </Typography>
    <Favorite color="error" style={{ fontSize: 20 }}>Love</Favorite>
    <Typography> by CeSIUM</Typography>
  </CenteredBox>
);

const Footer = ({facebook, twitter, instagram, github}) => (
  <FooterBar color="secondary">
    <Grid container justify="center" alignItems="center">
      <SocialLink social={`https://www.facebook.com/${facebook}`} iconComp={faFacebook} />
      <SocialLink social={`https://www.twitter.com/${twitter}`} iconComp={faTwitter} />
      <SocialLink social={`https://www.instagram.com/${instagram}`} iconComp={faInstagram} />
      <SocialLink social={`https://www.github.com/${github}`} iconComp={faGithub} />
      <Grid item xs={12}>
        <WithLove />
      </Grid>
    </Grid>
  </FooterBar>
);

Footer.propTypes = {
  facebook: PropTypes.string.isRequired,
  twitter: PropTypes.string.isRequired,
  instagram: PropTypes.string.isRequired,
  github: PropTypes.string.isRequired,
};

SocialLink.propTypes = {
  iconComp: PropTypes.object.isRequired,
  social: PropTypes.string.isRequired,
};

export default Footer;
