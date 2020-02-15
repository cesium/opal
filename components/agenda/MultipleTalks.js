import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import DoubleActivity from './DoubleActivity';

const StyledBox = styled(Box)({
  width: '100%',
});

function MultipleTalks({ talk1, talk2, talk3, talk4 }) {
  return (
    <StyledBox>
      <DoubleActivity activityLeft={talk1} activityRight={talk2} />
      <DoubleActivity activityLeft={talk3} activityRight={talk4} />
    </StyledBox>
  );
}

MultipleTalks.propTypes = {
  talk1: PropTypes.object.isRequired,
  talk2: PropTypes.object.isRequired,
  talk3: PropTypes.object.isRequired,
  talk4: PropTypes.object.isRequired,
};

export default MultipleTalks;
