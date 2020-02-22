import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const SpeakersLeft = styled(Box)({
  width: '100%',
  paddingLeft: '0.9rem',
  paddingRight: '0.5rem',
});

const SpeakersRight = styled(Box)({
  width: '100%',
  paddingRight: '0.5rem',
  textAlign: 'right',
});

const SpeakerLine = (speakers) => {
  let line = speakers[0];

  for (let i = 1; i < speakers.length; i += 1) {
    line += ` &  ${speakers[i]}`;
  }

  return line;
};

function Speakers({ moderator, speakersLeft, speakersRight }) {
  let leftLine;

  if (speakersLeft && speakersLeft.length !== 0) {
    leftLine = moderator
      ? `${moderator} | ${SpeakerLine(speakersLeft)}`
      : `${SpeakerLine(speakersLeft)}`;
  }

  const rightLine =
    speakersRight && speakersRight.length !== 0
      ? `${SpeakerLine(speakersRight)}`
      : null;

  return (
    <Box>
      <SpeakersLeft>
        <Typography noWrap variant="subtitle2">
          {leftLine}
        </Typography>
      </SpeakersLeft>
      <SpeakersRight>
        <Typography noWrap variant="subtitle2">
          {rightLine}
        </Typography>
      </SpeakersRight>
    </Box>
  );
}

Speakers.propTypes = {
  moderator: PropTypes.string,
  speakersLeft: PropTypes.array.isRequired,
  speakersRight: PropTypes.array,
};

export default Speakers;
