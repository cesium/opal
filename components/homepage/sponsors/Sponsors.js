import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/styles';
import { Skeleton } from '@material-ui/lab';
import Link from '../../Link';
import TopSection from '../../TopSection';
import { SponsorGridContainer, SponsorGridItem } from './SponsorsGrid';

const LogoImg = styled('img')(({ size }) => ({
  maxWidth: `${size}rem`,
  maxHeight: `${size - 10}rem`,
  filter: 'brightness(0%) invert(1)',
  '@media (max-width: 480px)': {
    maxWidth: '100%',
    maxHeight: `${size * 5}px`,
  },
}));

const RoundedSkeleton = styled(Skeleton)({
  borderRadius: '1rem',
});

/* eslint-disable */
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
/* eslint-enable */

export default function Sponsors({ data, color, type, backgroundImage }) {
  let size;
  let singular = 's';

  switch (type) {
    case 'exclusive':
      size = 30;
      break;
    case 'gold':
      size = 20;
      break;
    case 'silver':
      size = 15;
      break;
    default:
      size = 7;
      break;
  }

  if (data.length === 1) {
    singular = '';
  }

  return (
    <TopSection
      title
      text={`${type} Sponsor${singular}`.toUpperCase()}
      color={color}
      backgroundImage={backgroundImage}
      contentUnderneath
    >
      <SponsorGridContainer>
        {shuffle(
          data.map((sponsor) => (
            <SponsorGridItem>
              {(
                <Link href={sponsor.url}>
                  <LogoImg size={size} src={sponsor.img} alt={sponsor.name} />
                </Link>
              ) || (
                <RoundedSkeleton
                  variant="rect"
                  animation="wave"
                  height={`${size}rem`}
                  width={`${size * 3}rem`}
                />
              )}
            </SponsorGridItem>
          )),
        )}
      </SponsorGridContainer>
    </TopSection>
  );
}

Sponsors.propTypes = {
  data: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string,
  type: PropTypes.oneOf(['gold', 'silver', 'bronze']),
};
