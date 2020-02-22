import React from 'react';
import Slider from 'react-slick';
import { Grid, withWidth } from '@material-ui/core';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import Layout from '../components/Layout';
import TopSection from '../components/TopSection';
import theme from '../components/theme';
import agenda from '../data/agenda.json';
import Day from '../components/agenda/Day';
import global from '../data/global.json';
import ActivitiesInfo from '../components/agenda/ActivitiesInfo';

function getActivities(agendaDay) {
  const activities = [];

  agendaDay.activities.forEach((activity) => {
    if (activity.multiple) {
      if (activity.triple) {
        activities.push(activity.talk1);
        activities.push(activity.talk2);
        activities.push(activity.talk3);
        activities.push(activity.workshop1);
        activities.push(activity.talk4);
        activities.push(activity.talk5);
        activities.push(activity.talk6);
      } else {
        activities.push(activity.talk1);
        if (activity.talk2) activities.push(activity.talk2);
        activities.push(activity.workshop1);
        if (activity.workshop2) activities.push(activity.workshop2);
        activities.push(activity.talk3);
        activities.push(activity.talk4);
      }
    } else if (activity.double) {
      activities.push(activity.activityLeft);
      activities.push(activity.activityRight);
    } else if (activity.triple) {
      activities.push(activity.activityLeft);
      activities.push(activity.activityCenter);
      activities.push(activity.activityRight);
    } else activities.push(activity);
  });

  const filteredActivities = activities.filter(
    (activity) =>
      !activity.offset &&
      !activity.tba &&
      !activity.breakfast &&
      !activity.lunch &&
      !activity.dinner &&
      !activity.coffee,
  );

  return filteredActivities;
}

function daysBetween(date1, date2) {
  // The number of milliseconds in one day
  const ONE_DAY = 1000 * 60 * 60 * 24;

  const differenceMs = Math.abs(date1 - date2);
  return Math.round(differenceMs / ONE_DAY);
}

const StyledGrid = styled(Grid)({
  paddingTop: '4rem',
  paddingBottom: '2rem',
  backgroundColor: theme.palette.primary.dark,
});

function NextArrow(props) {
  const { className, style, onClick, mobile } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        right: mobile ? '10%' : '26%',
        top: '2rem',
        zIndex: '5',
      }}
      onClick={onClick}
      // The following atattributes are used to solve linter problems
      role="button"
      tabIndex={0}
      aria-label="Next"
      onKeyPress={() => {}}
    />
  );
}

function PreviousArrow(props) {
  const { className, style, onClick, mobile } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        left: mobile ? '10%' : '26%',
        top: '2rem',
        zIndex: '5',
      }}
      onClick={onClick}
      // The following atattributes are used to solve linter problems
      role="button"
      tabIndex={0}
      aria-label="Previous"
      onKeyPress={() => {}}
    />
  );
}

function Agenda({ width }) {
  const mobile = width === 'xs';
  const startDate = new Date(global.event.startingDate);
  const endDate = new Date(global.event.endingDate);
  const currentDate = new Date();
  let daysSinceBeginning = 0;

  if (currentDate > startDate && currentDate <= endDate) {
    daysSinceBeginning = daysBetween(startDate, currentDate);
  }

  return (
    <Layout>
      <TopSection
        text="Agenda"
        color={theme.palette.primary.main}
        title
        pageTitle
      />
      <TopSection color={theme.palette.secondary.main}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={10} md={8} xl={8}>
            <Slider
              speed={500}
              adaptiveHeight
              initialSlide={daysSinceBeginning}
              infinite={false}
              nextArrow={<NextArrow mobile={mobile} />}
              prevArrow={<PreviousArrow mobile={mobile} />}
            >
              {agenda.map((agendaDay) => (
                <Day day={agendaDay.day} activities={agendaDay.activities} />
              ))}
            </Slider>
          </Grid>
        </Grid>
      </TopSection>
      <StyledGrid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        {agenda.map((agendaDay) => (
          <ActivitiesInfo
            day={agendaDay.day}
            activities={getActivities(agendaDay)}
          />
        ))}
      </StyledGrid>
    </Layout>
  );
}

Agenda.propTypes = {
  width: PropTypes.string,
};

PreviousArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  mobile: PropTypes.bool,
};

NextArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  mobile: PropTypes.bool,
};

export default withWidth()(Agenda);
