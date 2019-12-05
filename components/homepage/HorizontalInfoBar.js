import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import ResponsivePlayer from './ResponsivePlayer';

const Wrapper = styled(Grid)({
  paddingLeft: '2%',
  paddingRight: '2%',
  paddingTop: '2em',
  paddingBottom: '2em',
});

const TitleBox = styled(Grid)({
  paddingBottom: '3em',
  textAlign: 'center',
  textTransform: 'uppercase',
});

const BodyBox = styled(Grid)({
  textAlign: 'center',
  paddingLeft: '5%',
  paddingRight: '5%',
});

const Bold = styled(Typography)({
  fontWeight: 'bold',
});

const PlayerBox = styled(Grid)({
  paddingBottom: '2em',
  paddingRight: '3%',
  paddingLeft: '2%',
});

function HorizontalInfoBar({ title, body, url }) {
  return (
    <Wrapper container direction="column" justify="center" alignItems="center">
      <TitleBox item sm={12}>
        <Bold variant="h3">{title}</Bold>
      </TitleBox>
      <Grid container direction="row" justify="flex-start" alignItems="center">
        <PlayerBox item md={6} xs={12}>
          <ResponsivePlayer url={url} />
        </PlayerBox>
        <BodyBox item md={6} xs={12}>
          {body.map((line) => (
            <Typography key={line} variant="body1">
              {line}
            </Typography>
          ))}
        </BodyBox>
      </Grid>
    </Wrapper>
  );
}

HorizontalInfoBar.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.array.isRequired,
  url: PropTypes.string.isRequired,
};

export default HorizontalInfoBar;
