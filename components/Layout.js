import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Header from './Header';
import Footer from './Footer';
import config from '../static/configs';

const Layout = ({ children }) => (
  <Box>
    <Header />
      {children}
      <Footer facebook={config.facebook} twitter={config.twitter}
              instagram={config.instagram} github={config.github}/>
  </Box>
  );

Layout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Layout;
