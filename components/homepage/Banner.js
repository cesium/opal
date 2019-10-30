import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Typography, Grid, Box } from '@material-ui/core';
import PropTypes from 'prop-types';

const Wrapper = styled(Grid)({
  position: 'relative',
  overflow: 'hidden',
  zIndex: '-5',
});

const Body = styled(Grid)({
  position: 'absolute',
  paddingTop: '25vh',
  paddingLeft: '5vw',
  maxWidth: '90%',
  overflow: 'hidden',
});

const StyledText = styled(Typography)({
  color: 'white',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  lineHeight: '1.1em',
  textShadow: '0.08em 0.08em black',
  paddingBottom: '0.2em',
});

const Text = ({ src, variant }) => (
  <Grid item>
    <StyledText variant={variant}>{src}</StyledText>
  </Grid>
);

const Image = styled(Box)(({ src }) => ({
  height: '100vh',
  width: '100vw',
  backgroundImage: `url(${src})`,
  backgroundPositionX: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}));

function Banner({ src, title, subtitle }) {
  return (
    <Wrapper container direction="column">
      <Image src={src} />
      <Body
        container
        direction="column"
        justify="center"
        alignItems="flex-start"
      >
        <Text src={title} variant="h2" />
        <Text src={subtitle} variant="h4" />
      </Body>
    </Wrapper>
  );
}

Banner.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

Text.propTypes = {
  src: PropTypes.string,
  variant: PropTypes.string,
};

export default Banner;
