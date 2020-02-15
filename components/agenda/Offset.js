import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const height = (duration) => {
  return `${duration * 50}px`;
};

const OffsetBox = styled(Box)(({ offsetheight }) => ({
  width: '100%',
  position: 'relative',
  height: offsetheight,
  background: '#052d36', // not the best color. Maybe no background? Just shitf other activities down
  opacity: '0.3',
}));

function Offset({ duration }) {
  return <OffsetBox offsetheight={height(duration)} />;
}

Offset.propTypes = {
  duration: PropTypes.number.isRequired,
};

export default Offset;
