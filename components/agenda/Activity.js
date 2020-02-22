import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Link } from 'react-scroll';
import slugify from 'react-slugify';
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

const ActivityBlock = styled(Box)(({ actHeight, tba }) => ({
  position: 'relative',
  color: 'white',
  background: '#03191e',
  flexGrow: 1,
  height: '100%',
  minHeight: actHeight,
  '&:hover': {
    backgroundColor: tba ? '#03191e' : '#052d36',
    opacity: 1,
    cursor: tba ? 'initial' : 'pointer',
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
  moderator,
  speakersLeft,
  speakersRight,
  duration,
  place,
  multiple,
  mobile,
  tba,
}) {
  const activityId = slugify(name);
  let height = '';
  if (multiple) height = '174px';
  else if (mobile) height = '65px';
  // should not be a fixed value
  else height = activityHeight(duration);
  return (
    <AgendaActivity>
      <ActivityTime>{time}</ActivityTime>
      <Link to={activityId} smooth offset={-85}>
        <ActivityBlock actHeight={height} tba={tba}>
          <ActivityBorder />
          <ActivityName>{name}</ActivityName>
          <Speakers
            moderator={moderator}
            speakersLeft={speakersLeft}
            speakersRight={speakersRight}
          />
        </ActivityBlock>
      </Link>
      <ActivityLocation>{place}</ActivityLocation>
    </AgendaActivity>
  );
}

Activity.propTypes = {
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  moderator: PropTypes.string,
  speakersLeft: PropTypes.array,
  speakersRight: PropTypes.array,
  duration: PropTypes.number.isRequired,
  place: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  mobile: PropTypes.bool,
  tba: PropTypes.bool,
};

export default Activity;
