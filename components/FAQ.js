import React from 'react';
import {
  Typography,
  Accordion, // Use Accordion instead of ExpansionPanel
  AccordionSummary, // Use AccordionSummary instead of ExpansionPanelSummary
  AccordionDetails, // Use AccordionDetails instead of ExpansionPanelDetails
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { styled } from '@mui/material/styles'; // Import styled from MUI styles
import PropTypes from 'prop-types';
import theme from './theme';

// Styled components
const Summary = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const Details = styled(AccordionDetails)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  paddingTop: '1rem',
}));

const Text = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.title,
}));

const ColoredExpandMore = styled(ExpandMore)(({ theme }) => ({
  color: theme.palette.text.title,
}));

const Panel = styled(Accordion)({
  width: 600,
  maxWidth: '85vw',
});

// FAQ component
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

// PropTypes for FAQ
FAQ.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

export default FAQ;
