import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Footer from './Footer';
import NavBar from './navbar/NavBar';
import { social } from '../data/global.json';
import theme from './theme';

const MinimumHeightPageBox = styled(Box)({
  position: 'relative',
  minHeight: '100vh',
  backgroundColor: theme.palette.secondary.main,
});

const PaddedForFooterBox = styled(Box)({
  paddingBottom: '5.1rem',
});

const Layout = ({ children }) => (
  <MinimumHeightPageBox>
    <NavBar />
    <PaddedForFooterBox>{children}</PaddedForFooterBox>
    <Footer
      facebook={social.facebook}
      twitter={social.twitter}
      instagram={social.instagram}
      github={social.github}
      medium={social.medium}
    />
  </MinimumHeightPageBox>
);

Layout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Layout;
