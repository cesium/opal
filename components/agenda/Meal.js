import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const StyledBox = styled(Box)({
  width: '100%',
  display: 'flex',
  border: 1,
  paddingTop: '0.75rem',
});

const BorderBox = styled(Box)({
  margin: '15px 0',
  height: '15px',
  borderColor: 'white',
});

const MealType = styled(Typography)({
  width: '100%',
  textAlign: 'center',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  paddingBottom: '5px',
  color: 'white',
  display: 'inline-block',
  position: 'relative',
});

function Meal({ type }) {
  return (
    <StyledBox>
      <Grid container spacing={3}>
        <Grid item xs>
          <BorderBox borderTop={1} />
        </Grid>
        <Grid item>
          <MealType variant="h6">{type}</MealType>
        </Grid>
        <Grid item xs>
          <BorderBox borderTop={1} />
        </Grid>
      </Grid>
    </StyledBox>
  );
}

Meal.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Meal;
