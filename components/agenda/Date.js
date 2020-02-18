import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import theme from '../theme';

const StyledGrid = styled(Grid)({
  marginBottom: '2rem',
});

const Separator = styled('div')(({ height, thickness, color }) => ({
  width: thickness,
  height,
  backgroundColor: color,
  overflow: 'hidden',
}));

const WeekDay = styled(Box)(({ customColor, customSize }) => ({
  fontSize: customSize || 'x-large',
  fontWeight: 'bold',
  color: customColor || 'white',
}));

const CalendarDay = styled(Box)(({ customColor, customSize }) => ({
  fontSize: customSize || 'x-large',
  fontWeight: 'bold',
  color: customColor || theme.palette.primary.main,
}));

function Date({ day, color, fontSize, multiline }) {
  const dayMonth = `${day.day} ${day.month}`;
  return (
    <StyledGrid
      container
      direction={multiline ? 'column' : 'row'}
      spacing={multiline ? 0 : 2}
      alignItems="center"
      justify="center"
      xs={12}
    >
      <Grid item>
        <CalendarDay customSize={fontSize} customColor={color}>
          {dayMonth.toUpperCase()}
        </CalendarDay>
      </Grid>
      {!multiline && (
        <Grid item>
          <Separator color={color} thickness="0.2rem" height="2rem" />
        </Grid>
      )}
      <Grid item>
        <WeekDay customSize={fontSize} customColor={color}>
          {day.day_of_week.toUpperCase()}
        </WeekDay>
      </Grid>
    </StyledGrid>
  );
}

Date.propTypes = {
  day: PropTypes.object.isRequired,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  multiline: PropTypes.bool,
};

export default Date;
