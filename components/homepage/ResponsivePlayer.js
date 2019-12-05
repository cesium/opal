import React from 'react';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

const CustomPlayer = styled(ReactPlayer)({
  position: 'absolute',
  height: '100%',
  width: '100%',
  boxShadow: '1em -1em 0.5em #BEBEBE',
  top: 0,
  left: 0,
});

const Wrapper = styled(Box)({
  position: 'relative',
  paddingTop: '56.25%',
});

function ResponsivePlayer({ url }) {
  return (
    <Wrapper>
      <CustomPlayer url={url} playing={false} width="100%" height="100%" />
    </Wrapper>
  );
}

ResponsivePlayer.propTypes = {
  url: PropTypes.string.isRequired,
};

export default ResponsivePlayer;
