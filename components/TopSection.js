import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Grid } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import Underline from './Underline';
import theme from '../static/theme';

const Canvas = styled(Paper)(({ color, image, topPadding, botPadding }) => ({
  width: '100%',
  backgroundColor: color,
  position: 'relative',
  paddingTop: theme.spacing(topPadding),
  paddingBottom: theme.spacing(botPadding),
  overflow: 'hidden',
  backgroundImage: `url(${image})`,
  backgroundSize: '100%',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'bottom',
}));

const Title = styled(Typography)({
  fontWeight: 'bold',
  color: 'white',
  textTransform: 'uppercase',
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.h2.fontSize,
  },
});

const TitleGrid = styled(Grid)({
  marginBottom: theme.spacing(5),
});

// const Circle = styled('div')(({ top, bottom, left, right, diameter }) => ({
//   position: 'absolute',
//   top: `${top}`,
//   bottom: `${bottom}`,
//   left: `${left}`,
//   right: `${right}`,
//   width: `${diameter}vw`,
//   height: `${diameter}vw`,
//   borderStyle: 'solid',
//   borderRadius: '50%',
//   borderWidth: `${diameter/4}vw`,
//   borderColor: 'white',
//   opacity: '20%',
// }));

// vai ser um componente geral para meter qualquer coisa,
// por isso a parte do conteudo deve dar para adicionar cenas quando for utilizado

export default function TopSection({
  children,
  color,
  text,
  pageTitle,
  title,
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
    variant = 'h1';
    thickness = '0.5rem';
    diameter = '2.3rem';
    length = '7vw';
  }
  return (
    <Canvas
      square="true"
      elevation={2}
      color={color}
      image="/static/img/bubbles_20.png"
      botPadding={botPadding}
      topPadding={topPadding}
    >
      {/* <Circle diameter="10" top="20%" left="5%" />
      <Circle diameter="7" bottom="-5%" left="9%" />
      <Circle diameter="5" top="30%" left="20%" />
      <Circle diameter="10" bottom="-10%" left="40%" />
      <Circle diameter="10" top="20%" left="90%" /> */}
      <TitleGrid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Title variant={variant}>{text}</Title>
        </Grid>
        <Underline thickness={thickness} length={length} diameter={diameter} />
      </TitleGrid>
      {children}
    </Canvas>
  );
}

TopSection.propTypes = {
  children: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  pageTitle: PropTypes.bool,
  title: PropTypes.bool,
  contentUnderneath: PropTypes.bool,
};
