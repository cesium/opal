import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';
import Modal from '../Modal';
import { FormGrid, FormItem } from '../Form';
import { changeNickname } from '../../../utils/apiRequests';

export default function ModalEditNickname({
  handleUpdateData,
  open,
  handleClose,
}) {
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isNicknameValid = nickname
    ? String(nickname).length > 1 &&
      String(nickname).length < 16 &&
      String(nickname).match(
        /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-)[a-zA-Z0-9])*[a-zA-Z0-9]+$/,
      )
    : false;

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    setError('');
    setLoading(true);
    const response = changeNickname(
      nickname,
      localStorage.jwt,
      localStorage.UUID,
    );
    response.then((res) => {
      if (res.errors) {
        setError('Ocorreu um erro.');
      } else {
        setLoading(false);
        handleUpdateData(res.data);
        handleClose();
        localStorage.nickname = res.data.nickname;
      }
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <FormGrid
        handleSubmit={handleSubmit}
        isLoading={loading}
        noPadding
        noMargin
        fullWidth
      >
        <FormItem>
          <TextField
            label="Nickname"
            autoComplete="nickname"
            onChange={(event) => setNickname(event.target.value)}
            variant="outlined"
            required
            fullWidth
            autoFocus
            error={error}
          />
        </FormItem>
        <FormItem>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!isNicknameValid}
          >
            Enviar
          </Button>
        </FormItem>
      </FormGrid>
    </Modal>
  );
}

ModalEditNickname.propTypes = {
  handleUpdateData: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
