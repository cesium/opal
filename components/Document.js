import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Box, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import theme from './theme';

const StyledBox = styled(Box)({
  backgroundColor: theme.palette.secondary.light,
  overflow: 'hidden',
  padding: theme.spacing(3),
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
});

const StyledPaper = styled(Paper)({
  textAlign: 'center',
  maxWidth: '900px',
  margin: 'auto',
  color: 'white',
  wordWrap: 'break-word',
  backgroundColor: `rgba(${theme.palette.primary.mainRGB}, 0.8)`,
  padding: theme.spacing(3),
});

const Document = ({ children }) => (
  <StyledBox>
    <StyledPaper>{children}</StyledPaper>
  </StyledBox>
);

Document.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Document;
