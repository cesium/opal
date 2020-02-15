import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Speakers from './Speakers';
import theme from '../theme';

const ActivityTime = styled(Box)({
  textAlign: 'left',
  color: theme.palette.primary.main,
  paddingLeft: '0.6rem',
  fontWeight: 'bold',
});

const ActivityName = styled(Box)({
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  textTransform: 'uppercase',
  paddingLeft: '0.9rem',
  paddingRight: '0.5rem',
  paddingTop: '0.15rem',
  fontWeight: 'bold',
});

const ActivityBorder = styled(Box)({
  position: 'absolute',
  backgroundColor: '#052d36',
  height: '100%',
  width: '0.6rem',
  boxSizing: 'border-box',
});

const activityHeight = (duration) => {
  return `${duration * 65}px`;
};

const ActivityBlock = styled(Box)(({ actHeight }) => ({
  position: 'relative',
  color: 'white',
  background: '#03191e',
  flexGrow: 1,
  height: '100%',
  minHeight: actHeight,
  '&:hover': {
    backgroundColor: '#03191e', // '#052d36'
    opacity: 1,
  },
}));

const ActivityLocation = styled(Box)({
  textAlign: 'right',
  color: theme.palette.primary.main,
  minHeight: '20px',
  fontWeight: 'bold',
});

const AgendaActivity = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

function Activity({
  name,
  time,
  speakersLeft,
  speakersRight,
  duration,
  place,
  triple,
  multiple,
  mobile,
}) {
  let height = '';
  if (triple) height = '178px';
  else if (multiple) height = '174px';
  else if (mobile) height = '65px';
  // should not be a fixed value
  else height = activityHeight(duration);
  return (
    <AgendaActivity>
      <ActivityTime>{time}</ActivityTime>
      <ActivityBlock actHeight={height}>
        <ActivityBorder />
        <ActivityName>{name}</ActivityName>
        <Speakers speakersLeft={speakersLeft} speakersRight={speakersRight} />
      </ActivityBlock>
      <ActivityLocation>{place}</ActivityLocation>
    </AgendaActivity>
  );
}

Activity.propTypes = {
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  speakersLeft: PropTypes.array,
  speakersRight: PropTypes.array,
  duration: PropTypes.number.isRequired,
  place: PropTypes.string.isRequired,
  triple: PropTypes.bool,
  multiple: PropTypes.bool,
  mobile: PropTypes.bool,
};

export default Activity;
