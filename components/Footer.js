import React from 'react';
import { Grid, AppBar, Box, Typography } from '@material-ui/core/';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import Favorite from '@material-ui/icons/Favorite';
import SocialIcons from './SocialIcons';
import theme from './theme';
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

const ColoredTypography = styled(Typography)(({ color }) => ({
  color,
}));

const WithLove = ({ color }) => (
  <Grid item xs={12}>
    <CenteredBox mb={1}>
      <ColoredTypography color={color || theme.palette.text.title}>
        made with
      </ColoredTypography>
      <Favorite color="error" fontSize="small">
        Love
      </Favorite>
      <Link href="https://cesium.di.uminho.pt">
        <ColoredTypography color={color || theme.palette.text.title}>
          by CeSIUM
        </ColoredTypography>
      </Link>
    </CenteredBox>
  </Grid>
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
      <WithLove />
      <SocialIcons
        facebook={facebook}
        twitter={twitter}
        github={github}
        instagram={instagram}
        medium={medium}
        color={iconColor || theme.palette.icons}
      />
    </Grid>
  </StyledAppBar>
);

WithLove.propTypes = {
  color: PropTypes.string,
};

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
