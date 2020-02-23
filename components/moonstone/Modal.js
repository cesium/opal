import React from 'react';
import { Paper, Modal as MUIModal } from '@material-ui/core';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/styles';
import theme from '../theme';

const StyledModal = styled(MUIModal)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  outline: 0,
});

const StyledPaper = styled(Paper)(({ noPadding }) => ({
  backgroundColor: theme.palette.primary.light,
  maxHeight: '75vh',
  maxWidth: '80vw',
  padding: noPadding ? 'none' : '2.5rem',
  overflow: 'hidden',
  outline: 0,
}));

export default function Modal({ children, open, onClose, noPadding }) {
  return (
    <StyledModal open={open} onClose={onClose}>
      <StyledPaper noPadding={noPadding}>{children}</StyledPaper>
    </StyledModal>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  noPadding: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};
