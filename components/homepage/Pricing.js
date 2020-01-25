import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Container,
  Box,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Link from '../Link';
import TopSection from '../TopSection';
import theme from '../../static/theme';

const StyledBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'baseline',
  padding: '0.5rem',
});

const StyledCard = styled(Card)({
  height: '100%',
});

const StyledCardHeader = styled(CardHeader)({
  backgroundColor: theme.palette.grey[200],
  textColor: 'white',
});

const StyledCardActions = styled(CardActions)({
  justifyContent: 'center',
  margin: '0.8em',
});

const StyledCardContent = styled(CardContent)({
  paddingBottom: '0px',
});

function PricingCard({ title, subtitle, price, link, description }) {
  const priceLine = `${price}€`;
  return (
    <StyledCard>
      <StyledCardHeader
        title={title}
        subheader={subtitle}
        titleTypographyProps={{ align: 'center' }}
        subheaderTypographyProps={{ align: 'center' }}
      />
      <StyledCardContent>
        <StyledBox>
          <Typography component="h2" variant="h3">
            {priceLine}
          </Typography>
        </StyledBox>
        {description.map((line) => (
          <Typography variant="subtitle1" align="center">
            {line}
          </Typography>
        ))}
      </StyledCardContent>
      <StyledCardActions>
        <Link href={link}>
          <Button variant="contained" color="secondary">
            Comprar
          </Button>
        </Link>
      </StyledCardActions>
    </StyledCard>
  );
}

function Pricing({ tiers }) {
  return (
    <TopSection
      text="Bilhetes"
      color={theme.palette.secondary.light}
      title
      contentUnderneath
    >
      <Container maxWidth="md" component="main">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="stretch"
          spacing={5}
        >
          {tiers.map((tier) => (
            <Grid item key={tier.title} xs={10} sm={6} md={4}>
              <PricingCard
                title={tier.title}
                subtitle={tier.subtitle}
                price={tier.price}
                link={tier.link}
                description={tier.description}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </TopSection>
  );
}

PricingCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  description: PropTypes.arrayOf(PropTypes.string).isRequired,
  price: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired,
};

Pricing.propTypes = {
  tiers: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.arrayOf(PropTypes.string).isRequired,
      price: PropTypes.number.isRequired,
      link: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Pricing;
