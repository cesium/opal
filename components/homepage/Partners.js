import React from 'react';
import { styled } from '@material-ui/core/styles';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TopSection from '../TopSection';
import theme from '../theme';
import Link from '../Link';

const LogoImg = styled('img')({
  width: 'auto',
  margin: '0 auto',
  height: '7em',
  objectFit: 'contain',
});

const PaddedGrid = styled(Grid)({
  paddingBottom: theme.spacing(4),
});

function Partners({ title, data, color, backgroundImage }) {
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <TopSection
      title
      text={title}
      color={color}
      backgroundImage={backgroundImage}
      contentUnderneath
    >
      <PaddedGrid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={10} md={6} lg={4}>
          <Slider
            infinite
            autoplay
            arrows={false}
            slidesToShow={desktop ? 2 : 1}
            slidesToScroll={1}
            speed={2000}
            autoplaySpeed={3000}
          >
            {data.map((partner) =>
              partner.url ? (
                <Link href={partner.url}>
                  <LogoImg size={15} src={partner.img} alt={partner.name} />
                </Link>
              ) : (
                <LogoImg size={15} src={partner.img} alt={partner.name} />
              ),
            )}
          </Slider>
        </Grid>
      </PaddedGrid>
    </TopSection>
  );
}

Partners.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  color: PropTypes.string,
  backgroundImage: PropTypes.string,
};

export default Partners;
