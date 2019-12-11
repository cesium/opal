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
import theme from '../../static/theme';

const StyledGrid = styled(Grid)({
  marginTop: '1em',
  marginBottom: '1em',
  justifyContent: 'center',
});

const StyledBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'baseline',
  marginBottom: '0.2em',
});

const StyledCardHeader = styled(CardHeader)({
  backgroundColor: theme.palette.grey[200],
});

const StyledCardActions = styled(CardActions)({
  justifyContent: 'center',
});

function PricingCard({ title, price, link, description }) {
  const priceLine = `${price}€`;
  return (
    <Card>
      <StyledCardHeader
        title={title}
        titleTypographyProps={{ align: 'center' }}
      />
      <CardContent>
        <StyledBox>
          <Typography component="h2" variant="h3" color="textPrimary">
            {priceLine}
          </Typography>
        </StyledBox>
        {description.map((line) => (
          <Typography variant="subtitle1" align="center">
            {line}
          </Typography>
        ))}
      </CardContent>
      <StyledCardActions>
        <Link href={link}>
          <Button variant="contained" color="secondary">
            Comprar
          </Button>
        </Link>
      </StyledCardActions>
    </Card>
  );
}

function Pricing({ tiers }) {
  return (
    <Container maxWidth="md" component="main">
      <StyledGrid container spacing={5}>
        {tiers.map((tier) => (
          <Grid item key={tier.title} xs={8} sm={6} md={4}>
            <PricingCard
              title={tier.title}
              price={tier.price}
              link={tier.link}
              description={tier.description}
            />
          </Grid>
        ))}
      </StyledGrid>
    </Container>
  );
}

PricingCard.propTypes = {
  title: PropTypes.string.isRequired,
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
