import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Activity from './Activity';

const AgendaDoubleActivity = styled(Grid)({
  direction: 'row',
  justify: 'center',
});

function ParallelTalks({ talk1, talk2, talk3, mobile }) {
  return (
    <AgendaDoubleActivity container spacing={1}>
      <Grid item xs={talk3 ? 4 : 6}>
        <Activity
          name={talk1.name}
          time={talk1.time}
          duration={talk1.duration}
          speakersLeft={talk1.speakersLeft}
          speakersRight={talk1.speakersRight}
          place={talk1.place}
          tba={talk1.tba}
          mobile={mobile}
        />
      </Grid>
      <Grid item xs={talk3 ? 4 : 6}>
        <Activity
          name={talk2.name}
          time={talk2.time}
          duration={talk2.duration}
          speakersLeft={talk2.speakersLeft}
          speakersRight={talk2.speakersRight}
          place={talk2.place}
          tba={talk2.tba}
          mobile={mobile}
        />
      </Grid>
      {talk3 && (
        <Grid item xs={talk3 ? 4 : 6}>
          <Activity
            name={talk3.name}
            time={talk3.time}
            duration={talk3.duration}
            speakersLeft={talk3.speakersLeft}
            speakersRight={talk3.speakersRight}
            place={talk3.place}
            tba={talk3.tba}
            mobile={mobile}
          />
        </Grid>
      )}
    </AgendaDoubleActivity>
  );
}

ParallelTalks.propTypes = {
  talk1: PropTypes.object.isRequired,
  talk2: PropTypes.object.isRequired,
  talk3: PropTypes.object,
  mobile: PropTypes.bool,
};

export default ParallelTalks;
