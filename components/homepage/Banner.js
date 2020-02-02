import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Typography, Grid, Box, Hidden } from '@material-ui/core';
import PropTypes from 'prop-types';

const Canvas = styled(Box)({
  position: 'relative',
  top: '0px',
  left: '0px',
  width: '100%',
  height: '100vh',
  overflow: 'hidden',
});

const Background = styled(Box)(({ src }) => ({
  width: '100%',
  height: '100vh',
  backgroundImage: `url(${src})`,
  backgroundSize: 'cover',
  backgroundPositionX: 'center',
}));

const StyledGrid = styled(Grid)({
  position: 'absolute',
  top: '0px',
  left: '0px',
  width: '100%',
  height: '100%',
});

const Logo = styled('img')({
  width: '100%',
  filter: 'drop-shadow(4px 4px 0px #000000)',
  // https://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting
  userSelect: 'none',
  msUserSelect: 'none',
  MozUserSelect: 'none',
  KhtmlUserSelect: 'none',
  WebkitTouchCallout: 'none',
  WebkitUserSelect: 'none',
});

const Text = styled(Typography)({
  color: 'white',
  fontWeight: 'medium',
  fontSize: '36px',
  textTransform: 'uppercase',
  lineHeight: '1em',
  textShadow: '0.08em 0.08em black',
  userSelect: 'none',
  msUserSelect: 'none',
  MozUserSelect: 'none',
  KhtmlUserSelect: 'none',
  WebkitTouchCallout: 'none',
  WebkitUserSelect: 'none',
});

const Circles = styled('img')(
  ({ rotation, scale, top, bottom, left, right }) => ({
    position: 'absolute',
    top: `${top}`,
    bottom: `${bottom}`,
    left: `${left}`,
    right: `${right}`,
    width: scale,
    // opacity: '20%',
    filter: 'opacity(30%)',
    transform: `rotate(${rotation})`,
    userSelect: 'none',
    msUserSelect: 'none',
    MozUserSelect: 'none',
    KhtmlUserSelect: 'none',
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
  }),
);

function Banner({ background, logo, date, location }) {
  return (
    <Canvas src={background}>
      <Background src={background} />
      <StyledGrid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={9} md={7} lg={6}>
          <Logo src={logo} />
          <Grid container direction="row" justify="space-between">
            <Grid item>
              <Text>{date}</Text>
            </Grid>
            <Grid item>
              <Text>{location}</Text>
            </Grid>
          </Grid>
        </Grid>
      </StyledGrid>
      <Hidden implementation="css" mdDown>
        <Circles
          src="/img/circle_small.png"
          rotation="157.85deg"
          scale="20%"
          bottom="-5vh"
          left="0px"
        />
        <Circles
          src="/img/circle_small.png"
          rotation="6.25deg"
          scale="20%"
          top="5vh"
          right="-5vw"
        />
      </Hidden>
      <Hidden implementation="css" lgUp>
        <Circles
          src="/img/circle_small.png"
          rotation="110deg"
          scale="25vh"
          bottom="-12vh"
          left="0px"
        />
        <Circles
          src="/img/circle_small.png"
          rotation="-70deg"
          scale="25vh"
          top="-12vh"
          right="5vw"
        />
      </Hidden>
    </Canvas>
  );
}

Banner.propTypes = {
  background: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  date: PropTypes.string,
  location: PropTypes.string,
};

export default Banner;
