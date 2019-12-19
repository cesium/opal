import React from 'react';
import { Grid, Box } from '@material-ui/core/';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from './Link';
import theme from '../static/theme';

const DynamicFontAwesomeIcon = styled(FontAwesomeIcon)((props) => ({
  color: 'white',
  '&:hover': {
    color: props.hover,
  },
}));

const SocialLink = ({ icon, url }) => (
  <Grid item>
    <Box mt={1}>
      <Link href={url}>
        <DynamicFontAwesomeIcon
          icon={icon}
          size="2x"
          hover={theme.palette.secondary.main}
        />
      </Link>
    </Box>
  </Grid>
);

SocialLink.propTypes = {
  icon: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
};

export default SocialLink;
