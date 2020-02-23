import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import Modal from '../Modal';

export default function ModalEditAvatar({ onClose, open }) {
  return (
    <Modal open={open} onClose={onClose}>
      <CircularProgress size="100px" />
    </Modal>
  );
}

ModalEditAvatar.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
