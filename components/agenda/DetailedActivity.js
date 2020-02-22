import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography, Card, CardContent } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Element } from 'react-scroll';
import { LocationOn, Person, Schedule, Business } from '@material-ui/icons';
import slugify from 'react-slugify';
import theme from '../theme';
import Underline from '../Underline';
import Link from '../Link';

const ActivityCard = styled(Card)({
  backgroundColor: theme.palette.primary.main,
});

const StyledBox = styled(Box)({
  display: 'flex',
  color: '#fff',
});

const TypeTypography = styled(Typography)({
  paddingTop: '0.3rem',
});

const DescriptionTypography = styled(Typography)({
  paddingTop: '1.8rem',
  whiteSpace: 'pre-wrap',
});

const ActivityInfoGrid = styled(Grid)({
  paddingTop: '0.75rem',
});

const ActivityDescription = ({
  name,
  description,
  mobile,
  place,
  time,
  speakers,
  companyName,
  companyLink,
  type,
}) => {
  return (
    <Box color="#fff">
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <Box
            fontWeight="bold"
            fontSize={mobile ? 'h6.fontSize' : 'h4.fontSize'}
            textAlign="center"
          >
            {name.toUpperCase()}
          </Box>
        </Grid>
        <Grid item>
          <Underline
            thickness="0.25rem"
            length={mobile ? 75 : 150}
            diameter="1.5rem"
          />
        </Grid>
        <Grid item>
          {type && (
            <TypeTypography variant="subtitle1" color="ihnerit">
              {type.toUpperCase()}
            </TypeTypography>
          )}
        </Grid>
        <ActivityInfo
          place={place}
          time={time}
          speakers={speakers}
          companyName={companyName}
          companyLink={companyLink}
          type={type}
          mobile={mobile}
        />
        {description && (
          <Grid item xs={mobile ? 12 : 10}>
            <DescriptionTypography variant="body2">
              {description}
            </DescriptionTypography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

const ActivityInfo = ({
  place,
  time,
  speakers,
  companyName,
  companyLink,
  mobile,
}) => {
  return (
    <ActivityInfoGrid
      container
      item
      xs={mobile ? 11 : 8}
      direction="row"
      justify="center"
      alignItems="flex-start"
      spacing={1}
    >
      {place && (
        <Grid item>
          <InfoLine location text={place} />
        </Grid>
      )}
      <Grid item>
        <InfoLine time text={time} />
      </Grid>
      {speakers &&
        speakers.map((speaker) => (
          <Grid item>
            <SpeakerName name={speaker} />
          </Grid>
        ))}
      {companyName && companyLink && (
        <Grid item>
          <CompanyLink name={companyName} url={companyLink} />
        </Grid>
      )}
    </ActivityInfoGrid>
  );
};

const InfoLine = ({ location, time, text }) => {
  return (
    <StyledBox>
      {location && <LocationOn fontSize="Small" />}
      {time && <Schedule fontSize="Small" />}
      <Typography variant="subtitle2">{text}</Typography>
    </StyledBox>
  );
};

const SpeakerName = ({ name }) => {
  const speakerId = slugify(name);

  return (
    <Link href={`/speakers#${speakerId}`}>
      <StyledBox>
        <Person fontSize="Small" />
        <Typography variant="subtitle2">{name}</Typography>
      </StyledBox>
    </Link>
  );
};

const CompanyLink = ({ name, url }) => {
  return (
    <Link href={url}>
      <StyledBox>
        <Business fontSize="Small" />
        <Typography variant="subtitle2">{name}</Typography>
      </StyledBox>
    </Link>
  );
};

function DetailedActiviy({
  name,
  description,
  place,
  time,
  speakers,
  companyName,
  companyLink,
  type,
  mobile,
}) {
  const activityId = slugify(name);
  return (
    <Element id={activityId} name={activityId}>
      <ActivityCard>
        <CardContent>
          <ActivityDescription
            name={name}
            description={description}
            place={place}
            time={time}
            speakers={speakers}
            companyName={companyName}
            companyLink={companyLink}
            type={type}
            mobile={mobile}
          />
        </CardContent>
      </ActivityCard>
    </Element>
  );
}

DetailedActiviy.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  speakers: PropTypes.array,
  place: PropTypes.string.isRequired,
  companyName: PropTypes.string,
  companyLink: PropTypes.string,
  type: PropTypes.string,
  mobile: PropTypes.bool,
};

ActivityDescription.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  mobile: PropTypes.bool,
  time: PropTypes.string.isRequired,
  speakers: PropTypes.array,
  place: PropTypes.string.isRequired,
  companyName: PropTypes.string,
  companyLink: PropTypes.string,
  type: PropTypes.string,
};

ActivityInfo.propTypes = {
  time: PropTypes.string.isRequired,
  speakers: PropTypes.array,
  place: PropTypes.string.isRequired,
  companyName: PropTypes.string,
  companyLink: PropTypes.string,
  mobile: PropTypes.bool,
};

InfoLine.propTypes = {
  location: PropTypes.bool,
  time: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

SpeakerName.propTypes = {
  name: PropTypes.string.isRequired,
};

CompanyLink.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
};

export default DetailedActiviy;
