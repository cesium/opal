import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box } from '@material-ui/core';
import { styled } from '@material-ui/styles';

const StyledBox = styled(Box)({
  paddingTop: '20px',
  overflow: 'hidden',
});

const StyledGrid = styled(Grid)({
  paddingLeft: '10%',
  paddingRight: '10%',
});

const PaddedBox = styled('div')({
  paddingLeft: '3vw',
  paddingRight: '3vw',
});

const SponsorGridContainer = ({ children }) => (
  <StyledBox>
    <StyledGrid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={10}
    >
      {children}
    </StyledGrid>
  </StyledBox>
);

const SponsorGridItem = ({ children }) => (
  <Grid item>
    <PaddedBox>{children}</PaddedBox>
  </Grid>
);

export { SponsorGridContainer, SponsorGridItem };

SponsorGridContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

SponsorGridItem.propTypes = {
  children: PropTypes.node.isRequired,
};
