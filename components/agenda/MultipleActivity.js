import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Activity from './Activity';
import MultipleTalks from './MultipleTalks';
import ParallelTalks from './ParallelTalks';

const AgendaMultipleActivityGrid = styled(Grid)({
  width: '100%',
});

const AgendaMultipleActivity = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
});

const TalksBox = styled(Box)(({ singleWorkshop, tripleTalk }) => ({
  float: 'left',
  // eslint-disable-next-line no-nested-ternary
  width: tripleTalk ? '75%' : singleWorkshop ? '66%' : '50%',
}));

const WorkshopBox = styled(Box)(({ singleWorkshop, tripleTalk }) => ({
  float: 'right',
  marginLeft: '1%',
  width: singleWorkshop && !tripleTalk ? '33%' : '24%',
}));

function MultipleActivity({
  talk1,
  talk2,
  talk3,
  talk4,
  talk5,
  talk6,
  workshop1,
  workshop2,
  mobile,
}) {
  if (mobile) {
    if (talk5 && talk6)
      return (
        <AgendaMultipleActivityGrid>
          <Activity
            name={talk1.name}
            time={talk1.time}
            duration={talk1.duration}
            speakersLeft={talk1.speakersLeft}
            speakersRight={talk1.speakersRight}
            place={talk1.place}
            tba={talk1.tba}
            mobile
          />
          <ParallelTalks talk1={talk2} talk2={talk3} mobile />
          <Activity
            name={workshop1.name}
            time={workshop1.time}
            duration={workshop1.duration}
            speakersLeft={workshop1.speakersLeft}
            speakersRight={workshop1.speakersRight}
            place={workshop1.place}
            tba={workshop1.tba}
            mobile
          />
          <Activity
            name={talk4.name}
            time={talk4.time}
            duration={talk4.duration}
            speakersLeft={talk4.speakersLeft}
            speakersRight={talk4.speakersRight}
            place={talk4.place}
            tba={talk4.tba}
            mobile
          />
          <ParallelTalks talk1={talk5} talk2={talk6} mobile />
        </AgendaMultipleActivityGrid>
      );
    if (!talk2 && !workshop2)
      return (
        <AgendaMultipleActivityGrid>
          <Activity
            name={talk1.name}
            time={talk1.time}
            duration={talk1.duration}
            speakersLeft={talk1.speakersLeft}
            speakersRight={talk1.speakersRight}
            place={talk1.place}
            tba={talk1.tba}
            mobile
          />
          <Activity
            name={workshop1.name}
            time={workshop1.time}
            duration={workshop1.duration}
            speakersLeft={workshop1.speakersLeft}
            speakersRight={workshop1.speakersRight}
            place={workshop1.place}
            tba={workshop1.tba}
            mobile
          />
          <ParallelTalks talk1={talk3} talk2={talk4} mobile />
        </AgendaMultipleActivityGrid>
      );
    if (!workshop2)
      return (
        <AgendaMultipleActivityGrid>
          <Activity
            name={talk1.name}
            time={talk1.time}
            duration={talk1.duration}
            speakersLeft={talk1.speakersLeft}
            speakersRight={talk1.speakersRight}
            place={talk1.place}
            tba={talk1.tba}
            mobile
          />
          <Activity
            name={workshop1.name}
            time={workshop1.time}
            duration={workshop1.duration}
            speakersLeft={workshop1.speakersLeft}
            speakersRight={workshop1.speakersRight}
            place={workshop1.place}
            tba={workshop1.tba}
            mobile
          />
          <ParallelTalks talk1={talk3} talk2={talk4} mobile />
        </AgendaMultipleActivityGrid>
      );
    return (
      <AgendaMultipleActivityGrid>
        <ParallelTalks talk1={talk1} talk2={talk2} mobile />
        <ParallelTalks talk1={workshop1} talk2={workshop2} mobile />
        <ParallelTalks talk1={talk3} talk2={talk4} mobile />
      </AgendaMultipleActivityGrid>
    );
  }
  return (
    <AgendaMultipleActivity>
      <TalksBox singleWorkshop={!workshop2} tripleTalk={talk5 && talk6}>
        <MultipleTalks
          talk1={talk1}
          talk2={talk2}
          talk3={talk3}
          talk4={talk4}
          talk5={talk5}
          talk6={talk6}
        />
      </TalksBox>
      <WorkshopBox singleWorkshop={!workshop2} tripleTalk={talk5 && talk6}>
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
      </WorkshopBox>
      {workshop2 && (
        <WorkshopBox>
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
        </WorkshopBox>
      )}
    </AgendaMultipleActivity>
  );
}

MultipleActivity.propTypes = {
  talk1: PropTypes.object.isRequired,
  talk2: PropTypes.object,
  talk3: PropTypes.object.isRequired,
  talk4: PropTypes.object.isRequired,
  talk5: PropTypes.object,
  talk6: PropTypes.object,
  workshop1: PropTypes.object.isRequired,
  workshop2: PropTypes.object,
  mobile: PropTypes.bool,
};

export default MultipleActivity;
