import React from 'react';
import PropTypes from 'prop-types';

const SEO = ({ event, social }) => (
  <>
    <title>{event.title}</title>

    <meta name="title" content={event.name} />
    <meta name="description" content={event.description} />
    {event.keywords.length > 0 ? (
      <meta name="keywords" content={event.keywords.join(`, `)} />
    ) : null}

    <meta property="og:type" content="website" />
    <meta property="og:title" content={event.name} />
    <meta property="og:description" content={event.description} />
    <meta property="og:url" content={event.url} />
    <meta property="og:image" content={event.cover} />
    <meta property="og:image:secure_url" content={event.cover} />

    <meta property="og:site_name" content={event.title} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={`${event.name} ${event.year}`} />
    <meta name="twitter:description" content={event.description} />
    <meta property="twitter:url" content={event.url} />
    <meta name="twitter:creator" content={`@{social.twitter}`} />
    <meta name="twitter:site" content={`@${social.twitter}`} />
    <meta property="twitter:image" content={event.cover} />
  </>
);

SEO.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    year: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    cover: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  social: PropTypes.shape({
    facebook: PropTypes.string,
    twitter: PropTypes.string,
    instagram: PropTypes.string,
    github: PropTypes.string,
    medium: PropTypes.string,
  }).isRequired,
};

export default SEO;
