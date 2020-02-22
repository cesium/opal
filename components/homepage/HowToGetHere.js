import React from 'react';
import { styled } from '@material-ui/core/styles';
import {
  Grid,
  IconButton,
  Card,
  CardContent,
  Typography,
  Collapse,
} from '@material-ui/core';
import {
  Train,
  DriveEta,
  AirplanemodeActive,
  DirectionsBus,
  ExpandMore,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import theme from '../theme';
import TopSection from '../TopSection';

const MeanCard = styled(Card)({
  width: '20rem',
  color: 'black',
});

const Bold = styled(Typography)({
  fontWeight: 'bold',
});

const ColoredIcon = styled(IconButton)({
  color: 'black',
});

const MeanContent = styled(CardContent)({
  backgroundColor: 'white',
});

const PaddedGrid = styled(Grid)({
  paddingLeft: '3%',
  paddingRight: '3%',
  paddingBottom: '3rem',
});

function getIcon(title) {
  if (title === 'Carro') return <DriveEta fontSize="large" />;
  if (title === 'Comboio') return <Train fontSize="large" />;
  if (title === 'Autocarro') return <DirectionsBus fontSize="large" />;
  if (title === 'Avião') return <AirplanemodeActive fontSize="large" />;
  return null;
}

const InvertedExpandMore = styled(ExpandMore)({
  transform: 'rotate(180deg)',
});

const MeanHeader = styled(Grid)({
  backgroundColor: theme.palette.grey[200],
  paddingBottom: theme.spacing(1),
  paddingTop: theme.spacing(1),
});

function Mean({ title, desc }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <MeanCard>
      <MeanHeader
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item xs={2}>
          <ColoredIcon>{getIcon(title)}</ColoredIcon>
        </Grid>
        <Grid item xs={3}>
          <Bold variant="h4">{title}</Bold>
        </Grid>
        <Grid item xs={5} />
        <Grid item xs={1}>
          <IconButton onClick={handleExpandClick} aria-expanded={expanded}>
            {expanded ? <InvertedExpandMore /> : <ExpandMore />}
          </IconButton>
        </Grid>
      </MeanHeader>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <MeanContent>
          <Typography variant="body1" align="justify">
            {desc}
          </Typography>
        </MeanContent>
      </Collapse>
    </MeanCard>
  );
}

const HowToGetHere = ({ location, means, color }) => (
  <TopSection text={location} color={color} title>
    <PaddedGrid container direction="row" justify="center" spacing={8}>
      {means.map((mean) => (
        <Grid item>
          <Mean title={mean.title} desc={mean.description} />
        </Grid>
      ))}
    </PaddedGrid>
  </TopSection>
);

HowToGetHere.propTypes = {
  location: PropTypes.string.isRequired,
  means: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
  ),
  color: PropTypes.string,
};

Mean.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
};

export default HowToGetHere;
