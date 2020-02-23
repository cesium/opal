import React from 'react';
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { styled } from '@material-ui/styles';
import PropTypes from 'prop-types';
import theme from './theme';

const Summary = styled(ExpansionPanelSummary)({
  backgroundColor: theme.palette.primary.main,
});

const Details = styled(ExpansionPanelDetails)({
  backgroundColor: theme.palette.primary.light,
  paddingTop: '1rem',
});

const Text = styled(Typography)({
  color: theme.palette.text.title,
});

const ColoredExpandMore = styled(ExpandMore)({
  color: theme.palette.text.title,
});

const Panel = styled(ExpansionPanel)({
  width: 600,
  maxWidth: '85vw',
});

const FAQ = ({ question, answer }) => (
  <Panel>
    <Summary expandIcon={<ColoredExpandMore />}>
      <Text variant="h6">{question}</Text>
    </Summary>
    <Details>
      <Text variant="body1">{answer}</Text>
    </Details>
  </Panel>
);

FAQ.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

export default FAQ;
