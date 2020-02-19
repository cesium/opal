import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Grid, Box } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import Underline from './Underline';
import theme from './theme';

const Canvas = styled(Paper)(({ color, topPadding, botPadding }) => ({
  width: '100%',
  backgroundColor: color,
  position: 'relative',
  paddingTop: theme.spacing(topPadding),
  paddingBottom: theme.spacing(botPadding),
  overflow: 'hidden',
}));

const Background = styled(Box)(({ src }) => ({
  position: 'absolute',
  top: '0px',
  width: '100%',
  height: '100%',
  filter: 'opacity(10%)',
  backgroundImage: `url(${src})`,
  backgroundSize: '100%',
  backgroundPositionX: 'center',
  backgroundRepeat: 'no-repeat',
}));

const Title = styled(Typography)(({ customColor }) => ({
  fontWeight: 'bold',
  color: customColor,
  textTransform: 'uppercase',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.h2.fontSize,
  },
}));

const TitleGrid = styled(Grid)({
  marginBottom: theme.spacing(5),
});

export default function TopSection({
  children,
  color,
  text,
  backgroundImage,
  pageTitle,
  title,
  titleColor,
  contentUnderneath,
}) {
  let topPadding = 8;
  let botPadding = 0;
  let variant = 'h4';
  let thickness = '0.4rem';
  let diameter = '1.8rem';
  let length = '4vw';
  if (title) {
    if (pageTitle) {
      topPadding = 16;
    }
    if (contentUnderneath) {
      botPadding = 8;
    }
    variant = 'h2';
    thickness = '0.5rem';
    diameter = '2.3rem';
    length = '7vw';
  }
  return (
    <Canvas
      square
      elevation={2}
      color={color}
      image="/img/bubbles_20.png"
      botPadding={botPadding}
      topPadding={topPadding}
    >
      {!backgroundImage && <Background src="/img/bubbles_20.png" />}
      <Background src={backgroundImage} />
      {title && (
        <TitleGrid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={11}>
            <Title
              customColor={titleColor || theme.palette.text.title}
              variant={variant}
            >
              {text}
            </Title>
          </Grid>
          <Underline
            thickness={thickness}
            length={length}
            diameter={diameter}
          />
        </TitleGrid>
      )}
      {children}
    </Canvas>
  );
}

TopSection.propTypes = {
  children: PropTypes.object,
  color: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string,
  text: PropTypes.string,
  pageTitle: PropTypes.bool,
  title: PropTypes.bool,
  titleColor: PropTypes.string,
  contentUnderneath: PropTypes.bool,
};
