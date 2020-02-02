import React from 'react';
import CountdownComponent from 'react-countdown-now';
import { Typography, Grid } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import PropTypes from 'prop-types';
import theme from '../../static/theme';

const StyledGrid = styled(Grid)({
  marginLeft: theme.spacing(5),
  marginRight: theme.spacing(5),
  width: 'auto',
});

const NumberTypography = styled(Typography)({
  fontWeight: 'bold',
  color: 'white',
});

const UnitTypography = styled(Typography)({
  fontWeight: 'medium',
  color: 'white',
  // textShadow: '2px 2px 0 #000000',
  textTransform: 'uppercase',
});

const Unit = ({ value, unit }) => (
  <Grid container item direction="column" justify="center" alignItems="center">
    <Grid item>
      <NumberTypography variant="h1">{value}</NumberTypography>
    </Grid>
    <Grid item>
      <UnitTypography variant="h6">{unit}</UnitTypography>
    </Grid>
  </Grid>
);

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    // return null;
  }
  // Render a countdown
  return (
    <StyledGrid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={5}
    >
      <Grid item>
        <Unit value={days} unit="dias" />
      </Grid>
      <Grid item>
        <Unit value={hours} unit="horas" />
      </Grid>
      <Grid item>
        <Unit value={minutes} unit="minutos" />
      </Grid>
      <Grid item>
        <Unit value={seconds} unit="segundos" />
      </Grid>
    </StyledGrid>
  );
};

export default function Countdown({ date }) {
  return <CountdownComponent date={new Date(date)} renderer={renderer} />;
}

Unit.propTypes = {
  value: PropTypes.object.isRequired,
  unit: PropTypes.string.isRequired,
};

renderer.propTypes = {
  days: PropTypes.object.isRequired,
  hours: PropTypes.object.isRequired,
  minutes: PropTypes.object.isRequired,
  seconds: PropTypes.object.isRequired,
  completed: PropTypes.object.isRequired,
};

Countdown.propTypes = {
  date: PropTypes.string.isRequired,
};
