import React from 'react';
import { styled } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import theme from './theme';

const CircleUnderline = styled('div')(({ diameter, thickness, color }) => ({
  width: diameter,
  height: diameter,
  borderStyle: 'solid',
  borderRadius: '50%',
  borderWidth: thickness,
  borderColor: color,
  // filter: 'drop-shadow(2px 2px 0 #000000)',
}));

const Dash = styled('div')(({ length, thickness, color }) => ({
  width: length,
  height: thickness,
  backgroundColor: color,
  // filter: 'drop-shadow(2px 2px 0 #000000)',
  overflow: 'hidden',
}));

const DashLeft = styled(Dash)({
  position: 'relative',
  left: '1px',
});

const DashRight = styled(Dash)({
  position: 'relative',
  left: '-1px',
});

const Underline = ({ thickness, length, diameter, color }) => (
  <Grid item container direction="row" justify="center" alignItems="center">
    <Grid item>
      <DashLeft
        thickness={thickness}
        length={length}
        color={color || theme.palette.text.title}
      />
    </Grid>
    <Grid item>
      <CircleUnderline
        diameter={diameter}
        thickness={thickness}
        color={color || theme.palette.text.title}
      />
    </Grid>
    <Grid item>
      <DashRight
        thickness={thickness}
        length={length}
        color={color || theme.palette.text.title}
      />
    </Grid>
  </Grid>
);

Underline.propTypes = {
  thickness: PropTypes.string.isRequired,
  diameter: PropTypes.string.isRequired,
  length: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Underline;
