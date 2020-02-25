import React from 'react';
import PropTypes from 'prop-types';
import { Grid, withWidth } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import DetailedActivity from './DetailedActivity';
import Date from './Date';
import theme from '../theme';

const StyledGrid = styled(Grid)({
  paddingBottom: '2rem',
  paddingTop: '2rem',
});

const activitySpeakers = (activity) => {
  let speakers = [];
  if (activity.moderator) speakers = speakers.concat(activity.moderator);
  if (activity.speakersLeft) speakers = speakers.concat(activity.speakersLeft);
  if (activity.speakersRight)
    speakers = speakers.concat(activity.speakersRight);
  return speakers;
};

function ActivitiesInfo({ day, activities, width }) {
  const mobile = width === 'xs' || width === 'sm';
  const multineDate = width === 'xs';
  return (
    <StyledGrid
      item
      container
      direction="column"
      justify="center"
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
      {activities.map((activity) => {
        const speakers = activitySpeakers(activity);
        return (
          <Grid item xs={12}>
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
  width: PropTypes.string,
};

export default withWidth()(ActivitiesInfo);
