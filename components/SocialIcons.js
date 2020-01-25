import React from 'react';
import { styled } from '@material-ui/core/styles';
import { IconButton, SvgIcon } from '@material-ui/core';
import {
  Facebook,
  GitHub,
  LinkedIn,
  Twitter,
  Instagram,
  Language,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import Link from './Link';

const ColoredIconButton = styled(IconButton)(({ color }) => ({
  color: `${color}`,
}));

const SocialIcon = ({ href, label, color, children }) => (
  <Link href={href}>
    <ColoredIconButton aria-label={label} color={color}>
      {children}
    </ColoredIconButton>
  </Link>
);

const Medium = () => (
  <SvgIcon viewBox="0 0 448 512">
    <path d="M0 32v448h448V32H0zm372.2 106.1l-24 23c-2.1 1.6-3.1 4.2-2.7 6.7v169.3c-.4 2.6.6 5.2 2.7 6.7l23.5 23v5.1h-118V367l24.3-23.6c2.4-2.4 2.4-3.1 2.4-6.7V199.8l-67.6 171.6h-9.1L125 199.8v115c-.7 4.8 1 9.7 4.4 13.2l31.6 38.3v5.1H71.2v-5.1l31.6-38.3c3.4-3.5 4.9-8.4 4.1-13.2v-133c.4-3.7-1-7.3-3.8-9.8L75 138.1V133h87.3l67.4 148L289 133.1h83.2v5z" />
  </SvgIcon>
);

const SocialIcons = ({
  facebook,
  twitter,
  linkedin,
  github,
  instagram,
  website,
  medium,
  color,
}) => (
  <div>
    {website ? (
      <SocialIcon href={website} label="website" color={color}>
        <Language />
      </SocialIcon>
    ) : null}
    {facebook ? (
      <SocialIcon
        href={`https://www.facebook.com/${facebook}`}
        label="facebook"
        color={color}
      >
        <Facebook />
      </SocialIcon>
    ) : null}
    {twitter ? (
      <SocialIcon
        href={`https://www.twitter.com/${twitter}`}
        label="twitter"
        color={color}
      >
        <Twitter />
      </SocialIcon>
    ) : null}
    {instagram ? (
      <SocialIcon
        href={`https://www.instagram.com/${instagram}`}
        label="instagram"
        color={color}
      >
        <Instagram />
      </SocialIcon>
    ) : null}
    {linkedin ? (
      <SocialIcon
        href={`https://www.linkedin.com/in/${linkedin}/`}
        label="linkedin"
        color={color}
      >
        <LinkedIn />
      </SocialIcon>
    ) : null}
    {github ? (
      <SocialIcon
        href={`https://www.github.com/${github}`}
        label="github"
        color={color}
      >
        <GitHub />
      </SocialIcon>
    ) : null}
    {medium ? (
      <SocialIcon
        href={`https://www.medium.com/${medium}`}
        label="medium"
        color={color}
      >
        <Medium />
      </SocialIcon>
    ) : null}
  </div>
);

SocialIcon.propTypes = {
  href: PropTypes.string,
  label: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.element.isRequired,
};

SocialIcons.propTypes = {
  facebook: PropTypes.string,
  twitter: PropTypes.string,
  linkedin: PropTypes.string,
  github: PropTypes.string,
  instagram: PropTypes.string,
  website: PropTypes.string,
  medium: PropTypes.string,
  color: PropTypes.string,
};

export default SocialIcons;
