import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import ParallelTalks from './ParallelTalks';
import Activity from './Activity';

const StyledBox = styled(Box)({
  width: '100%',
});

function MultipleTalks({ talk1, talk2, talk3, talk4, talk5, talk6 }) {
  return talk5 && talk6 ? (
    <StyledBox>
      <ParallelTalks talk1={talk1} talk2={talk2} talk3={talk3} />
      <ParallelTalks talk1={talk4} talk2={talk5} talk3={talk6} />
    </StyledBox>
  ) : (
    <StyledBox>
      {talk2 ? (
        <ParallelTalks talk1={talk1} talk2={talk2} />
      ) : (
        <Activity
          name={talk1.name}
          time={talk1.time}
          duration={talk1.duration}
          speakersLeft={talk1.speakersLeft}
          speakersRight={talk1.speakersRight}
          place={talk1.place}
          tba={talk1.tba}
        />
      )}
      <ParallelTalks talk1={talk3} talk2={talk4} />
    </StyledBox>
  );
}

MultipleTalks.propTypes = {
  talk1: PropTypes.object.isRequired,
  talk2: PropTypes.object,
  talk3: PropTypes.object.isRequired,
  talk4: PropTypes.object.isRequired,
  talk5: PropTypes.object,
  talk6: PropTypes.object,
};

export default MultipleTalks;
