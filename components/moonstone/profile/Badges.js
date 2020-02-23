import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Badge from '../Badge';
import Title from '../../Title';
import theme from '../../theme';

const StyledGrid = styled(Grid)({
  margin: 'auto',
  [theme.breakpoints.up('xs')]: {
    width: '95%',
  },
  [theme.breakpoints.up('sm')]: {
    width: '80%',
  },
  [theme.breakpoints.up('md')]: {
    width: '70%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '60%',
  },
});

export default function Badges({ sectionTitle, data }) {
  return (
    <StyledGrid
      container
      justify="center"
      alignItems="flexitem-start"
      spacing={5}
    >
      <Grid item xs={12}>
        <Title text={sectionTitle} />
      </Grid>
      {data.badges ? (
        data.badges.map((badge) => {
          if (badge.type === 0) return null;
          return (
            <Grid item>
              <Badge found id={badge.id} avatar={badge.avatar} />
            </Grid>
          );
        })
      ) : (
        <Grid item>
          <CircularProgress size="100px" />
        </Grid>
      )}
    </StyledGrid>
  );
}

Badges.propTypes = {
  data: PropTypes.object.isRequired,
  sectionTitle: PropTypes.string.isRequired,
};
