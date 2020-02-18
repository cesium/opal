import React from 'react';
import PropTypes from 'prop-types';
import { Link as MUILink, styled } from '@material-ui/core';
import InternalLink from './InternalLink';

const StyledInternalLink = styled(InternalLink)(({ color }) => ({
  color: `${color}`,
}));

const StyledMUILink = styled(MUILink)(({ color }) => ({
  color: `${color}`,
}));

export default function Link({ color, href, children }) {
  if (href.charAt(0) === '/') {
    return (
      <StyledInternalLink color={color} href={href}>
        {children}
      </StyledInternalLink>
    );
  }
  return (
    <StyledMUILink color={color} href={href} target="_blank">
      {children}
    </StyledMUILink>
  );
}

Link.propTypes = {
  color: PropTypes.string,
  href: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};
