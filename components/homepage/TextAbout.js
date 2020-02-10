import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import theme from '../theme';
import TopSection from '../TopSection';

const StyledPaper = styled(Paper)(({ color }) => ({
  marginLeft: theme.spacing(5),
  marginRight: theme.spacing(5),
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  width: 'auto',
  textAlign: 'center',
  wordWrap: 'break-word',
  backgroundColor: `rgba(${color}, 0.8)`,
}));

const MessageTypography = styled(Typography)(({ color }) => ({
  fontWeight: 'bold',
  color,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

function TextAbout({ messages, messageColor, backgroundColor, paperColor }) {
  const [ticks, setTicks] = React.useState(0);
  const message = messages[ticks];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTicks((t) => (t + 1) % messages.length);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <TopSection
      text="Sobre"
      color={backgroundColor || theme.palette.secondary.main}
      title
      contentUnderneath
    >
      <StyledPaper
        justifyContent="center"
        display="flex"
        color={paperColor || theme.palette.primary.mainRGB}
      >
        <MessageTypography
          variant="h3"
          color={messageColor || theme.palette.text.title}
        >
          {message}
        </MessageTypography>
      </StyledPaper>
    </TopSection>
  );
}

TextAbout.propTypes = {
  messages: PropTypes.arrayOf(String).isRequired,
  messageColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  paperColor: PropTypes.string,
};

export default TextAbout;
