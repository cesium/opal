import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Grid, Box, Typography, Divider, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlane,
  faBus,
  faTrain,
  faCar,
} from '@fortawesome/free-solid-svg-icons';

const PaddingBottomBox = styled(Box)({
  paddingBottom: '2em',
});

const Wrapper = styled(PaddingBottomBox)(({ src }) => ({
  paddingLeft: '2%',
  paddingRight: '2%',
  paddingTop: '2em',
  backgroundImage: `url(${src})`,
  backgroundPosition: 'center bottom',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  width: '100%',
}));

const CenterContentGrid = styled(Grid)({
  textAlign: 'center',
});

const TextBox = styled(Box)({
  color: 'white',
  maxWidth: '20em',
  paddingTop: '2em',
});

const Desc = styled(Typography)({
  paddingTop: '1em',
});

const Bold = styled(Typography)({
  fontWeight: 'bold',
});

const CustomPaper = styled(Paper)({
  paddingTop: '2em',
  paddingBottom: '2em',
  paddingRight: '1em',
  paddingLeft: '1em',
  background: `rgba(255, 255, 255, 0.8)`,
});

const Mean = ({ name, icon, desc }) => (
  <CenterContentGrid item>
    <FontAwesomeIcon icon={icon} size="6x" style={{ color: 'white' }} />
    <TextBox>
      <CustomPaper elevation={15}>
        <Bold variant="h5">{name}</Bold>
        <Desc variant="subtitle1">{desc}</Desc>
      </CustomPaper>
    </TextBox>
  </CenterContentGrid>
);

const TitleBox = styled(PaddingBottomBox)({
  textAlign: 'center',
  textTransform: 'uppercase',
  color: 'white',
});

const SubtitleBox = styled(PaddingBottomBox)({
  textAlign: 'center',
  color: 'white',
});

const GridRow = styled(Grid)({
  paddingTop: '2em',
});

const HowToGetHere = ({ location, subtitle, means, background }) => (
  <Wrapper src={background}>
    <TitleBox xs={12}>
      <Bold variant="h3">{location}</Bold>
    </TitleBox>
    <SubtitleBox xs={12}>
      <Typography variant="h4">{subtitle}</Typography>
    </SubtitleBox>
    <Divider style={{ backgroundColor: 'white' }} />
    <GridRow
      container
      direction="row"
      justify="center"
      alignItems="flex-start"
      spacing={5}
    >
      <Mean
        name={means.plane.title}
        icon={faPlane}
        desc={means.plane.description}
      />
      <Mean name={means.bus.title} icon={faBus} desc={means.bus.description} />
      <Mean
        name={means.train.title}
        icon={faTrain}
        desc={means.train.description}
      />
      <Mean name={means.car.title} icon={faCar} desc={means.car.description} />
    </GridRow>
  </Wrapper>
);

HowToGetHere.propTypes = {
  location: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  means: PropTypes.shape({
    plane: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
    bus: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
    train: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
    car: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
  }).isRequired,
  background: PropTypes.string.isRequired,
};

Mean.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.object,
  desc: PropTypes.string.isRequired,
};

export default HowToGetHere;
