import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import theme from '../theme';

const StyledGrid = styled(Grid)({
  marginBottom: '2rem',
});

const WeekDay = styled(Box)({
  fontSize: 'x-large',
  fontWeight: 'bold',
  color: 'white',
});

const CalendarDay = styled(Box)({
  fontSize: 'x-large',
  fontWeight: 'bold',
  color: theme.palette.primary.main,
});

function Date({ day }) {
  const dayMonth = `${day.day} ${day.month}`;
  return (
    <StyledGrid container direction="column" align="center">
      <Grid item>
        <CalendarDay>{dayMonth.toUpperCase()}</CalendarDay>
      </Grid>
      <Grid item>
        <WeekDay>{day.day_of_week.toUpperCase()}</WeekDay>
      </Grid>
    </StyledGrid>
  );
}

Date.propTypes = {
  day: PropTypes.object.isRequired,
};

export default Date;
