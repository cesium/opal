import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Activity from './Activity';

const AgendaDoubleActivity = styled(Grid)({
  direction: 'row',
  justify: 'center',
});

function TripleActivity({
  activityLeft,
  activityCenter,
  activityRight,
  mobile,
}) {
  return (
    <AgendaDoubleActivity container spacing={1}>
      <Grid item xs={4}>
        <Activity
          name={activityLeft.name}
          time={activityLeft.time}
          duration={activityLeft.duration}
          speakersLeft={activityLeft.speakersLeft}
          speakersRight={activityLeft.speakersRight}
          place={activityLeft.place}
          tba={activityLeft.tba}
          mobile={mobile}
        />
      </Grid>
      <Grid item xs={4}>
        <Activity
          name={activityCenter.name}
          time={activityCenter.time}
          duration={activityCenter.duration}
          speakersLeft={activityCenter.speakersLeft}
          speakersRight={activityCenter.speakersRight}
          place={activityCenter.place}
          tba={activityCenter.tba}
          mobile={mobile}
        />
      </Grid>
      <Grid item xs={4}>
        <Activity
          name={activityRight.name}
          time={activityRight.time}
          duration={activityRight.duration}
          speakersLeft={activityRight.speakersLeft}
          speakersRight={activityRight.speakersRight}
          place={activityRight.place}
          tba={activityRight.tba}
          mobile={mobile}
        />
      </Grid>
    </AgendaDoubleActivity>
  );
}

TripleActivity.propTypes = {
  activityLeft: PropTypes.object.isRequired,
  activityCenter: PropTypes.object.isRequired,
  activityRight: PropTypes.object.isRequired,
  mobile: PropTypes.bool,
};

export default TripleActivity;
