import React, { useState, useCallback } from 'react';
import { Grid, CircularProgress, Typography, Button } from '@material-ui/core';
import fetch from 'isomorphic-unfetch';
import { styled } from '@material-ui/styles';
import PropTypes from 'prop-types';
import theme from '../../theme';
import ModalEditNickname from './ModalEditNickname';
import ModalEditAvatar from './ModalEditAvatar';
import { StyledGrid, StyledAvatar, StyledTypography } from './StyledComponents';

const Flexbox = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
});

const StyledLabel = styled('label')({
  margin: '10px',
});

const StyledButton = styled(Button)({
  margin: '10px',
});

const HiddenInput = styled('input')({
  display: 'none',
});

const CenteredTypography = styled(Typography)({
  textAlign: 'center',
});

export default function AttendeeInfo({ data, allowEdits, handleUpdateData }) {
  const [modalAvatar, setModalAvatar] = useState(false);
  const [modalNickname, setModalNickname] = useState(false);
  const [error, setError] = useState('');

  const postNewAvatar = (event) => {
    const endpoint = `${process.env.ENDPOINT}${process.env.API_ATTENDEES}/${localStorage.UUID}`;
    const form = new FormData();
    form.append('attendee[avatar]', event.target.files[0]);
    fetch(endpoint, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: form,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.errors) {
          setError(
            'Ocorreu um erro. É possível que o formato da imagem não seja suportado.',
          );
        } else {
          setModalAvatar(false);
          handleUpdateData(res.data);
          localStorage.avatar = res.data.avatar;
        }
      });
  };

  const handleAvatarSubmit = (event) => {
    setModalAvatar(true);
    setError('');
    if (event) {
      event.preventDefault();
      event.persist();
    }
    if (event.target.files[0].size > 1000000) {
      setModalAvatar(false);
      setError(`O tamanho da imagem não pode ser superior a 1MB`);
      return null;
    }
    postNewAvatar(event);
    return null;
  };

  const handleNicknameClose = useCallback(() => {
    setModalNickname(false);
  }, []);

  return (
    <>
      {allowEdits && (
        <>
          <ModalEditAvatar
            open={modalAvatar}
            onClose={() => setModalAvatar(false)}
          />
          <ModalEditNickname
            open={modalNickname}
            handleClose={handleNicknameClose}
            handleUpdateData={handleUpdateData}
          />
        </>
      )}
      <StyledGrid container justify="center" alignItems="center" spacing={5}>
        {data.avatar && data.name ? (
          <>
            <Grid item>
              <StyledAvatar src={data.avatar} />
            </Grid>
            <Grid item>
              <StyledTypography color={theme.palette.primary.light}>
                Nome:
              </StyledTypography>
              <StyledTypography color={theme.palette.primary.main} variant="h6">
                {data.name}
              </StyledTypography>
              <StyledTypography color={theme.palette.primary.light}>
                Nickname:
              </StyledTypography>
              <StyledTypography color={theme.palette.primary.main} variant="h6">
                {data.nickname || 'Não definido'}
              </StyledTypography>
            </Grid>
            {allowEdits && (
              <Grid item xs={12}>
                <Flexbox>
                  {/* <StyledButton
                    variant="outlined"
                    color="primary"
                    onClick={handleOpenModalChangeAvatar}
                  >
                    Editar avatar
                  </StyledButton> */}
                  <StyledLabel htmlFor="upload-avatar">
                    <HiddenInput
                      accept="image/*"
                      id="upload-avatar"
                      type="file"
                      onChange={handleAvatarSubmit}
                    />
                    <Button variant="outlined" color="primary" component="span">
                      Editar avatar
                    </Button>
                  </StyledLabel>
                  <StyledButton
                    variant="outlined"
                    color="primary"
                    onClick={() => setModalNickname(true)}
                  >
                    Editar nickname
                  </StyledButton>
                </Flexbox>
              </Grid>
            )}
            {error && (
              <Grid item xs={12}>
                <CenteredTypography variant="h6" color="error">
                  {error}
                </CenteredTypography>
              </Grid>
            )}
          </>
        ) : (
          <Grid item>
            <CircularProgress size="100px" />
          </Grid>
        )}
      </StyledGrid>
    </>
  );
}

AttendeeInfo.propTypes = {
  data: PropTypes.object.isRequired,
  allowEdits: PropTypes.bool.isRequired,
  handleUpdateData: PropTypes.func.isRequired,
};
