import React from 'react';
import PropTypes, { object } from 'prop-types';
import { Box, withWidth } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Activity from './Activity';
import ParallelTalks from './ParallelTalks';
import MultipleActivity from './MultipleActivity';
import Meal from './Meal';
import Date from './Date';
import TripleActivity from './TripleActivity';

const agendaPagging = (mobile) => (mobile ? '0.5rem' : '3rem');

const AgendaDay = styled(Box)(({ mobile }) => ({
  width: '100%',
  paddingLeft: agendaPagging(mobile),
  paddingRight: agendaPagging(mobile),
  paddingBottom: '2rem',
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
}));

const ActivityType = (activity, mobile) => {
  if (activity.coffee) return <Meal type="Coffee-Break" />;
  if (activity.breakfast) return <Meal type="Pequeno-Almoço" />;
  if (activity.lunch) return <Meal type="Almoço" />;
  if (activity.dinner) return <Meal type="Jantar" />;

  if (activity.double) {
    return (
      <ParallelTalks
        talk1={activity.activityLeft}
        talk2={activity.activityRight}
        mobile={mobile}
      />
    );
  }

  if (activity.triple) {
    return (
      <TripleActivity
        activityLeft={activity.activityLeft}
        activityCenter={activity.activityCenter}
        activityRight={activity.activityRight}
        mobile={mobile}
      />
    );
  }

  if (activity.multiple) {
    return (
      <MultipleActivity
        talk1={activity.talk1}
        talk2={activity.talk2}
        talk3={activity.talk3}
        talk4={activity.talk4}
        talk5={activity.talk5}
        talk6={activity.talk6}
        workshop1={activity.workshop1}
        workshop2={activity.workshop2}
        mobile={mobile}
      />
    );
  }

  return (
    <Activity
      name={activity.name}
      time={activity.time}
      duration={activity.duration}
      moderator={activity.moderator}
      speakersLeft={activity.speakersLeft}
      speakersRight={activity.speakersRight}
      place={activity.place}
      tba={activity.tba}
      mobile={mobile}
    />
  );
};

function Day({ day, activities, width }) {
  const mobile = width === 'md' || width === 'sm' || width === 'xs';

  return (
    <AgendaDay mobile={mobile}>
      <Date day={day} multiline />
      {activities.map((activity) => ActivityType(activity, mobile))}
    </AgendaDay>
  );
}

Day.propTypes = {
  day: PropTypes.object.isRequired,
  activities: PropTypes.arrayOf(object).isRequired,
  width: PropTypes.string,
};

export default withWidth()(Day);
