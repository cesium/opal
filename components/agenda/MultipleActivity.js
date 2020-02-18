import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Activity from './Activity';
import MultipleTalks from './MultipleTalks';
import DoubleActivity from './DoubleActivity';

const AgendaMultipleActivityGrid = styled(Grid)({
  width: '100%',
});

const AgendaMultipleActivity = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
});

const TalksBox = styled(Box)({
  float: 'left',
  width: '50%',
});

const ActivityBox = styled(Box)({
  float: 'right',
  marginLeft: '1%',
  width: '24%',
});

function MultipleActivity({
  talk1,
  talk2,
  talk3,
  talk4,
  workshop1,
  workshop2,
  mobile,
}) {
  if (mobile)
    return (
      <AgendaMultipleActivityGrid>
        <DoubleActivity activityLeft={talk1} activityRight={talk2} mobile />
        <DoubleActivity
          activityLeft={workshop1}
          activityRight={workshop2}
          mobile
        />
        <DoubleActivity activityLeft={talk3} activityRight={talk4} mobile />
      </AgendaMultipleActivityGrid>
    );

  return (
    <AgendaMultipleActivity>
      <TalksBox>
        <MultipleTalks
          talk1={talk1}
          talk2={talk2}
          talk3={talk3}
          talk4={talk4}
        />
      </TalksBox>
      <ActivityBox>
        <Activity
          name={workshop1.name}
          time={workshop1.time}
          duration={workshop1.duration}
          speakersLeft={workshop1.speakersLeft}
          speakersRight={workshop1.speakersRight}
          place={workshop1.place}
          tba={workshop1.tba}
          multiple
        />
      </ActivityBox>
      <ActivityBox>
        <Activity
          name={workshop2.name}
          time={workshop2.time}
          duration={workshop2.duration}
          speakersLeft={workshop2.speakersLeft}
          speakersRight={workshop2.speakersRight}
          place={workshop2.place}
          tba={workshop2.tba}
          multiple
        />
      </ActivityBox>
    </AgendaMultipleActivity>
  );
}

MultipleActivity.propTypes = {
  talk1: PropTypes.object.isRequired,
  talk2: PropTypes.object.isRequired,
  talk3: PropTypes.object.isRequired,
  talk4: PropTypes.object.isRequired,
  workshop1: PropTypes.object.isRequired,
  workshop2: PropTypes.object.isRequired,
  mobile: PropTypes.bool,
};

export default MultipleActivity;
