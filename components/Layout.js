import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Header from './Header';
import Footer from './Footer';
import config from '../static/configs';
import { styled } from '@material-ui/core/styles';

const CustomBox = styled(Box)({
    position: 'relative',
    minHeight: '100vh',
});

const Layout = ({ children }) => (
  <CustomBox>
    <Header />
      {children}
      <Footer facebook={config.facebook} twitter={config.twitter}
              instagram={config.instagram} github={config.github}/>
  </CustomBox>
  );

Layout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Layout;
