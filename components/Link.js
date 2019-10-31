import React from 'react';
import PropTypes from 'prop-types';
import { Link as MUILink } from '@material-ui/core';
import InternalLink from './InternalLink';

export default function Link({ href, children }) {
  if (href.charAt(0) === '/') {
    return <InternalLink href={href}>{children}</InternalLink>;
  }
  return (
    <MUILink href={href} target="_blank">
      {children}
    </MUILink>
  );
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};
