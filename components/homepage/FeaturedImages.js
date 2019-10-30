import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Typography, Grid, Avatar, Box } from '@material-ui/core';
import PropTypes from 'prop-types';

const Wrapper = styled(Box)({
  paddingLeft: '2em',
  paddingRight: '2em',
  paddingTop: '1em',
  paddingBottom: '1em',
});

const TitleBox = styled(Box)({
  textAlign: 'center',
  textTransform: 'uppercase',
  paddingBottom: '1em',
  color: 'white',
});

const ImageBox = styled(Grid)({
  paddingBottom: '1em',
});

const Image = styled(Avatar)({
  width: 150,
  height: 150,
});

const TextBox = styled(Box)({
  textAlign: 'center',
  color: 'white',
});

const Bold = styled(Typography)({
  fontWeight: 'bold',
});

const FeaturedImage = ({ src, title, subtitle }) => (
  <Grid item>
    <Image src={src} />
    <TextBox>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="subtitle2">{subtitle}</Typography>
    </TextBox>
  </Grid>
);

const StyledFeaturedImage = styled(FeaturedImage)({
  paddingRight: '2em',
  paddingLeft: '2em',
});

function FeaturedImages({ title, featured }) {
  return (
    <Wrapper bgcolor="secondary.main">
      <TitleBox xs="12">
        <Bold variant="h5">{title}</Bold>
      </TitleBox>
      <ImageBox
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={4}
      >
        {featured.map((data) => (
          <StyledFeaturedImage
            src={data.src}
            title={data.title}
            subtitle={data.subtitle}
          />
        ))}
      </ImageBox>
    </Wrapper>
  );
}

FeaturedImages.propTypes = {
  title: PropTypes.string.isRequired,
  featured: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

FeaturedImage.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default FeaturedImages;
