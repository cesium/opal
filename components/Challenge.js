import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Paper, Typography, Grid, Button } from '@material-ui/core';
import { EmojiEvents } from '@material-ui/icons';
import PropTypes from 'prop-types';
import Underline from './Underline';
import Link from './Link';
import theme from './theme';

const PrizePaper = styled(Paper)({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.text.title,
  width: 200,
  height: '100%',
});

const PrizeDescription = styled(Typography)({
  textAlign: 'center',
});

const Prize = ({ condition, desc }) => (
  <PrizePaper elevation={3}>
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={0}
    >
      <Grid item>
        <EmojiEvents fontSize="large" />
      </Grid>
      {condition && (
        <Grid item>
          <Typography variant="h6">{condition}</Typography>
        </Grid>
      )}
      <Grid item>
        <PrizeDescription>{desc}</PrizeDescription>
      </Grid>
    </Grid>
  </PrizePaper>
);

const ChallengeTitle = styled(Typography)({
  textAlign: 'center',
  color: theme.palette.text.title,
  fontWeight: 'bold',
  paddingBottom: theme.spacing(1),
});

const ChallengeDescription = styled(Typography)({
  textAlign: 'center',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
});

const ChallengePaper = styled(Paper)({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.text.body,
  width: 600,
  maxWidth: '95vw',
  overflow: 'hidden',
});

const SignupButton = styled(Button)({
  marginTop: theme.spacing(3),
});

const Challenge = ({ title, desc, prizes, signup }) => (
  <ChallengePaper elevation={3}>
    <ChallengeTitle variant="h3">{title}</ChallengeTitle>
    <Underline thickness="0.3rem" length="10vw" diameter="2rem" />
    <ChallengeDescription align="justify" variant="body1">
      {desc}
    </ChallengeDescription>
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="stretch"
      spacing={3}
    >
      {prizes.map((pr) => (
        <Grid item>
          <Prize condition={pr.condition} desc={pr.prize} />
        </Grid>
      ))}
    </Grid>
    {signup ? (
      <Grid container justify="center">
        <Grid item>
          <Link href={signup}>
            <SignupButton variant="contained" size="large">
              Inscrições
            </SignupButton>
          </Link>
        </Grid>
      </Grid>
    ) : null}
  </ChallengePaper>
);

Prize.propTypes = {
  condition: PropTypes.string,
  desc: PropTypes.string.isRequired,
};

Challenge.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  prizes: PropTypes.arrayOf(
    PropTypes.shape({
      condition: PropTypes.string,
      prize: PropTypes.string.isRequired,
    }),
  ),
  signup: PropTypes.string,
};

export default Challenge;
