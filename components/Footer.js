import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import { Grid, AppBar, Typography, Box } from '@material-ui/core/';
import Favorite from '@material-ui/icons/Favorite';
import CopyrightIcon from '@material-ui/icons/Copyright';
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

const CopyrightTypography = styled(ColoredTypography)({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  padding: '5px',
});

const Copyright = () => (
  <Wrapper>
    <CopyrightTypography variant="body2" color={theme.palette.text.title}>
      <CopyrightIcon
        style={{ margin: '0 2px', padding: '0 0 2px', fontSize: '20px' }}
      />
      {` ${event.title} ${event.year}. Made with   `}
      <Favorite style={{ margin: '0 2px', fontSize: '16px' }}>Love</Favorite>
      {' by'}&nbsp;
      <Link color={theme.palette.text.title} href="https://cesium.di.uminho.pt">
        <>CeSIUM</>
      </Link>
      .
    </CopyrightTypography>
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
            <Link
              color={theme.palette.text.title}
              href="/docs/survival-guide.pdf"
            >
              <span>Survival Guide</span>
            </Link>
          </Typography>
          <span>&#160;&#160;&#160;&#160;</span>
          <Typography variant="body2">
            <Link color={theme.palette.text.title} href="/codeofconduct">
              <span>Code of Conduct</span>
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
