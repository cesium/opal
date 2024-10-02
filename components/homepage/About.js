import React, { useState } from 'react';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

const PlayerWrapper = styled('div')({
  position: 'relative',
  paddingTop: '56.25%',
});

const StyledReactPlayer = styled(ReactPlayer)({
  position: 'absolute',
  top: 0,
  left: 0,
});

const StyledIconButton = styled(IconButton)(({ hover }) => ({
  position: 'absolute',
  bottom: '2%',
  right: '2%',
  color: 'black',
  '&:hover': {
    color: hover,
  },
  opacity: '50%',
}));

function About({ url, thumbnail }) {
  const [muted, setMuted] = useState(true);
  const handleButton = () => {
    if (muted) setMuted(false);
    else setMuted(true);
  };
  return (
    <PlayerWrapper>
      <StyledReactPlayer
        url={url}
        light={thumbnail}
        playing
        loop
        volume={1}
        muted={muted}
        controls={false}
        width="100%"
        height="100%"
      />
      <StyledIconButton onClick={handleButton}>
        {muted ? <VolumeOffRoundedIcon /> : <VolumeUpRoundedIcon />}
      </StyledIconButton>
    </PlayerWrapper>
  );
}

About.propTypes = {
  url: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default About;
