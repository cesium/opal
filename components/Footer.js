import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import { Grid, AppBar, Typography, Box } from '@material-ui/core/';
import Favorite from '@material-ui/icons/Favorite';
import SocialIcons from './SocialIcons';
import Link from './Link';
import theme from './theme';
import { event } from '../data/global.json';

const Wrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
});

const StyledAppBar = styled(AppBar)({
  padding: theme.spacing(2),
  position: 'absolute',
  bottom: 0,
});

const ColoredTypography = styled(Typography)(({ color }) => ({
  color,
}));

const Copyright = () => (
  <Wrapper>
    <ColoredTypography variant="body2" color={theme.palette.text.title}>
      &copy;
      {` ${event.title} ${event.year}. Made with  `}
    </ColoredTypography>
    <Favorite color="error" fontSize="small">
      Love
    </Favorite>
    <ColoredTypography variant="body2" color={theme.palette.text.title}>
      {' by '}
      <Link color={theme.palette.text.title} href="https://cesium.di.uminho.pt">
        CeSIUM
      </Link>
      .
    </ColoredTypography>
  </Wrapper>
);

const Footer = ({
  facebook,
  twitter,
  instagram,
  github,
  medium,
  backgroundColor,
  iconColor,
}) => (
  <StyledAppBar color={backgroundColor || 'primary'} position="relative">
    <Grid container justify="center" alignItems="center">
      <Grid item xs={11} lg={4}>
        <Copyright />
      </Grid>
      <Grid item xs={11} lg={4}>
        <Wrapper>
          <SocialIcons
            facebook={facebook}
            twitter={twitter}
            github={github}
            instagram={instagram}
            medium={medium}
            color={iconColor || theme.palette.icons}
          />
        </Wrapper>
      </Grid>
      <Grid item xs={11} lg={4}>
        <Wrapper>
          <Typography variant="body2">
            <Link color={theme.palette.text.title} href="/codeofconduct">
              Code of Conduct
            </Link>
          </Typography>
        </Wrapper>
      </Grid>
    </Grid>
  </StyledAppBar>
);

Footer.propTypes = {
  facebook: PropTypes.string.isRequired,
  twitter: PropTypes.string.isRequired,
  instagram: PropTypes.string.isRequired,
  github: PropTypes.string.isRequired,
  medium: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  iconColor: PropTypes.string,
};

export default Footer;
