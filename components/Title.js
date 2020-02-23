import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import Underline from './Underline';
import theme from './theme';

const Canvas = styled('div')(({ topPadding, botPadding }) => ({
  width: '100%',
  position: 'relative',
  paddingTop: theme.spacing(topPadding),
  paddingBottom: theme.spacing(botPadding),
  overflow: 'hidden',
}));

const StyledTypography = styled(Typography)(({ color }) => ({
  fontWeight: 'bold',
  color,
  textTransform: 'uppercase',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.h2.fontSize,
  },
}));

export default function Title({ text, titleColor }) {
  const topPadding = 5;
  const botPadding = 0;
  const variant = 'h4';
  const thickness = '0.4rem';
  const diameter = '1.5rem';
  const length = '4vw';

  return (
    <Canvas botPadding={botPadding} topPadding={topPadding}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <StyledTypography
            color={titleColor || theme.palette.text.title}
            variant={variant}
          >
            {text}
          </StyledTypography>
        </Grid>
        <Underline thickness={thickness} length={length} diameter={diameter} />
      </Grid>
    </Canvas>
  );
}

Title.propTypes = {
  text: PropTypes.string.isRequired,
  titleColor: PropTypes.string,
};
