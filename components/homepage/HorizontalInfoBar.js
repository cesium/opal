import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

const Wrapper = styled(Grid)({
  paddingLeft: '2em',
  paddingRight: '2em',
  paddingTop: '2em',
  paddingBottom: '2em',
});

const TitleBox = styled(Grid)({
  paddingBottom: '1em',
  textAlign: 'center',
  textTransform: 'uppercase',
});

const BodyBox = styled(Grid)({
  textAlign: 'left',
});

const Bold = styled(Typography)({
  fontWeight: 'bold',
});

function HorizontalInfoBar({ title, body }) {
  return (
    <Wrapper container direction="row" justify="center" alignItems="flex-start">
      <TitleBox item sm="12" md="3">
        <Bold variant="h5">{title}</Bold>
      </TitleBox>
      <BodyBox item sm="12" md="9">
        {body.map((line) => (
          <Typography variant="body1">{line}</Typography>
        ))}
      </BodyBox>
    </Wrapper>
  );
}

HorizontalInfoBar.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.array.isRequired,
};

export default HorizontalInfoBar;
