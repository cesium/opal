import React from 'react';
import PropTypes from 'prop-types';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import DetailedActivity from './DetailedActivity';
import Date from './Date';
import theme from '../theme';

const StyledGrid = styled(Grid)({
  paddingBottom: '2rem',
  paddingTop: '2rem',
  backgroundColor: '#031e33',
});

const activitySpeakers = (activity) => {
  let speakers = [];
  if (activity.moderator) speakers = speakers.concat(activity.moderator);
  if (activity.speakersLeft) speakers = speakers.concat(activity.speakersLeft);
  if (activity.speakersRight)
    speakers = speakers.concat(activity.speakersRight);
  return speakers;
};

function ActivitiesInfo({ day, activities }) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen is small or extra small
  const multineDate = useMediaQuery(theme.breakpoints.only('xs')); // Check if screen is exactly extra small

  return (
    <StyledGrid
      item
      container
      direction="column"
      justifyContent="center"
      spacing={4}
      wrap="nowrap"
      xs={12}
      md={7}
      xl={6}
    >
      <Grid item>
        <Date
          fontSize="2rem"
          day={day}
          color={theme.palette.secondary.main}
          multiline={multineDate}
        />
      </Grid>
      {activities.map((activity, index) => {
        const speakers = activitySpeakers(activity);
        return (
          <Grid item xs={12} key={index} style={{ alignSelf: 'center' }}>
            <DetailedActivity
              name={activity.name}
              place={activity.place}
              time={activity.time}
              speakers={speakers}
              companyName={activity.companyName}
              companyLink={activity.companyLink}
              description={activity.description}
              type={activity.type}
              mobile={mobile}
              signup={activity.signupLink}
              rules={activity.rules}
            />
          </Grid>
        );
      })}
    </StyledGrid>
  );
}

ActivitiesInfo.propTypes = {
  day: PropTypes.string.isRequired,
  activities: PropTypes.array.isRequired,
};

export default ActivitiesInfo;
