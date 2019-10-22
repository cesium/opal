import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Footer from './Footer';
import NavBar from './navbar/NavBar';

const Layout = ({ children }) => (
  <Box>
    <NavBar />
    <Box>
      {children}
      <Footer />
    </Box>
  </Box>
);

Layout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Layout;
