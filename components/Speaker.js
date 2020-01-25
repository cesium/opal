import React from 'react';
import { styled } from '@material-ui/core/styles';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Collapse,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import PropTypes from 'prop-types';
import theme from '../static/theme';
import Underline from './Underline';
import SocialIcons from './SocialIcons';

const SpeakerPicture = styled(CardMedia)({
  width: 310,
  height: 210,
});

const SpeakerCard = styled(Card)({
  backgroundColor: theme.palette.secondary.main,
  maxWidth: 310,
});

const ColoredTypography = styled(Typography)({
  color: 'white',
});

const Company = styled(ColoredTypography)({
  marginBottom: 5,
});

const ShortBio = styled(ColoredTypography)({
  align: 'justify',
});

const RightIconButton = styled(IconButton)({
  marginLeft: 'auto',
  color: 'white',
});

const SpeakerBasics = styled(CardContent)({
  paddingBottom: 0,
});

const InvertedExpandMore = styled(ExpandMore)({
  transform: 'rotate(180deg)',
});

const Header = ({ img, name, company, title }) => (
  <div>
    <SpeakerPicture image={img} title={name} />
    <SpeakerBasics>
      <ColoredTypography variant="h6">{name}</ColoredTypography>
      <Company>{company}</Company>
      <ColoredTypography variant="subtitle2">{title}</ColoredTypography>
    </SpeakerBasics>
  </div>
);

function Speaker({
  img,
  name,
  facebook,
  twitter,
  linkedin,
  github,
  website,
  company,
  title,
  shortbio,
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <SpeakerCard>
      <Header img={img} name={name} company={company} title={title} />
      <CardActions disableSpacing>
        <SocialIcons
          facebook={facebook}
          twitter={twitter}
          github={github}
          linkedin={linkedin}
          website={website}
          color="white"
        />
        <RightIconButton onClick={handleExpandClick} aria-expanded={expanded}>
          {expanded ? <InvertedExpandMore /> : <ExpandMore />}
        </RightIconButton>
      </CardActions>
      {expanded ? (
        <Underline thickness="0.3rem" length={100} diameter="2rem" />
      ) : null}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <ShortBio align="justify">{shortbio}</ShortBio>
        </CardContent>
      </Collapse>
    </SpeakerCard>
  );
}

Header.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  title: PropTypes.string,
};

Speaker.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  linkedin: PropTypes.string,
  twitter: PropTypes.string,
  github: PropTypes.string,
  facebook: PropTypes.string,
  website: PropTypes.string,
  company: PropTypes.string,
  title: PropTypes.string,
  shortbio: PropTypes.string,
};

export default Speaker;
