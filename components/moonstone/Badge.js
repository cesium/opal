import React, { useState } from 'react';
import { styled } from '@material-ui/core/styles';
import {
  Typography,
  Avatar,
  Grid,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Modal from './Modal';
import theme from '../theme';
import Link from '../Link';

function Badge({ found, id, avatar }) {
  const [data, setData] = useState({});
  const [modal, setModal] = useState(false);

  async function fetchBadgeInfo() {
    const endpoint = `${process.env.ENDPOINT}${process.env.API_BADGES}/${id}`;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.jwt}`,
      },
    });
    const json = await response.json();
    setData(json.data);
  }

  const handleOpen = () => {
    fetchBadgeInfo();
    setModal(true);
  };

  const handleClose = () => {
    setModal(false);
  };

  const ScrollableBox = styled(Box)({
    overflow: 'auto',
    margin: '1rem',
  });

  const Image = styled(Avatar)({
    width: '150px',
    height: '150px',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '0.7em',
    cursor: 'pointer',
  });

  const ImageModal = styled(Image)({
    width: '200px',
    height: '200px',
    maxWidth: '50vw',
    maxHeight: '50vw',
    cursor: 'initial',
  });

  const StyledBox = styled(Box)(({ taken }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex',
    filter: `opacity(${taken ? 100 : 25}%)`,
  }));

  const TextBox = styled(Typography)(({ bold }) => ({
    color: theme.palette.text.title,
    overflow: 'hidden',
    fontWeight: bold ? 'bold' : 'normal',
    textAlign: 'center',
  }));

  const Divider = styled('div')(({ height }) => ({
    height,
  }));

  const ListBox = styled('div')({
    marginTop: '0.5rem',
    width: '100%',
    maxHeight: '20vh',
    overflow: 'auto',
  });

  const ScrollableList = styled(List)({
    width: '100%',
  });

  const StyledTypography = styled(Typography)(({ bold }) => ({
    color: theme.palette.text.body,
    fontWeight: bold ? 'bold' : 'normal',
  }));

  return (
    <>
      <StyledBox taken={found}>
        <Image src={avatar} onClick={handleOpen} />
      </StyledBox>
      <Modal open={modal} onClose={handleClose} noPadding>
        <ScrollableBox>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <ImageModal src={avatar} />
            </Grid>
            <Grid item>
              <TextBox bold variant="h5">
                {data.name}
              </TextBox>
            </Grid>
            <Grid item>
              <TextBox variant="h6">{data.description}</TextBox>
            </Grid>
            {data.attendees && (
              <>
                <Grid item>
                  <Divider height="1rem" />
                </Grid>
                <Grid item>
                  <StyledTypography bold variant="h6">
                    Conquistado por:
                  </StyledTypography>
                </Grid>
                <Grid item style={{ width: '100%' }}>
                  <ListBox>
                    <ScrollableList dense>
                      {data.attendees.map((attendee) => (
                        <Link href={`/user/${attendee.id}`}>
                          <ListItem divider alignItems="center">
                            <ListItemText
                              primary={
                                // eslint-disable-next-line react/jsx-wrap-multilines
                                <StyledTypography variant="body1">
                                  {attendee.nickname}
                                </StyledTypography>
                              }
                            />
                            <ListItemAvatar>
                              <Avatar src={attendee.avatar} />
                            </ListItemAvatar>
                          </ListItem>
                        </Link>
                      ))}
                    </ScrollableList>
                  </ListBox>
                </Grid>
              </>
            )}
          </Grid>
        </ScrollableBox>
      </Modal>
    </>
  );
}

export default Badge;

Badge.propTypes = {
  id: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
  found: PropTypes.bool,
};
