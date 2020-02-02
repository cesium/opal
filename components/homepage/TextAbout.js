import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import theme from '../theme';
import TopSection from '../TopSection';

const StyledPaper = styled(Paper)({
  marginLeft: theme.spacing(5),
  marginRight: theme.spacing(5),
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  width: 'auto',
  textAlign: 'center',
  wordWrap: 'break-word',
  backgroundColor: `rgba(${theme.palette.darkRGB.red}, ${theme.palette.darkRGB.green},${theme.palette.darkRGB.blue} , 0.8)`,
});

const NumberTypography = styled(Typography)({
  fontWeight: 'bold',
  color: 'white',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
});

function TextAbout({ messages }) {
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
      color={theme.palette.secondary.light}
      title
      contentUnderneath
    >
      <StyledPaper justifyContent="center" display="flex">
        <NumberTypography variant="h3">{message}</NumberTypography>
      </StyledPaper>
    </TopSection>
  );
}

TextAbout.propTypes = {
  messages: PropTypes.arrayOf(String).isRequired,
};

export default TextAbout;
