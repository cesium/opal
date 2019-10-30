import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Footer from './Footer';
import NavBar from './navbar/NavBar';
import { social } from '../data/global.json';

const Layout = ({ children }) => (
  <Box>
    <NavBar />
    <Box>
      {children}
      <Footer
        facebook={social.facebook}
        twitter={social.twitter}
        instagram={social.instagram}
        github={social.github}
        medium={social.medium}
      />
    </Box>
  </Box>
);

Layout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Layout;
