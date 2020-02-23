import React from 'react';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import { styled } from '@material-ui/core/styles';
import MoonstoneLayout from '../components/moonstone/MoonstoneLayout';
import Badge from '../components/moonstone/Badge';

const StyledGrid = styled(Grid)({
  margin: 'auto',
});

function checkStatus(response) {
  if (response.ok) {
    return response;
  }
  const error = new Error(response);
  error.response = response;
  return Promise.reject(error);
}

const badgeTypes = [
  { typeNumber: -1, text: 'Todos' },
  { typeNumber: 2, text: 'Empresas' },
  { typeNumber: 3, text: 'Talks' },
  { typeNumber: 4, text: 'Workshops' },
  { typeNumber: 5, text: 'Oradores' },
  { typeNumber: 6, text: 'Dias' },
  { typeNumber: 7, text: 'Outros' },
];

class BadgeDex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      badges: [],
      collectedBadges: [],
      filteredByType: [],
      badgesToDisplay: [],
      error: '',
      existingTypes: 6,
      selectedButtons: [],
      searchExpression: '',
    };
  }

  componentDidMount() {
    const endpoint = `${process.env.ENDPOINT}${process.env.API_BADGES}`;

    fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.jwt}`,
      },
    })
      .then(checkStatus)
      .then((res) => res.json())
      .then((res) => {
        this.handleBadges(res);
      })
      .catch((error) => this.handleError(error));
  }

  FilterSection = () => {
    return (
      <StyledGrid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
        spacing={2}
        xs={10}
        sm={7}
      >
        <Grid item>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            onChange={(e) => this.handleSearchBarInput(e.target.value)}
          />
        </Grid>
        <Grid container item spacing={1} justify="center" alignItems="center">
          {badgeTypes.map((badgeType) => (
            <Grid item>
              <this.FilterButton
                text={badgeType.text}
                type={badgeType.typeNumber}
              />
            </Grid>
          ))}
        </Grid>
      </StyledGrid>
    );
  };

  FilterButton = ({ type, text }) => {
    const { selectedButtons } = this.state;
    return (
      <Button
        variant={
          (type === -1 && selectedButtons.length === 0) ||
          selectedButtons.indexOf(type) !== -1
            ? 'contained'
            : 'outlined'
        }
        color="primary"
        onClick={() => this.handleButtonClick(type)}
      >
        {text}
      </Button>
    );
  };

  handleBadges(res) {
    if (res.data) {
      this.setState({
        badges: res.data,
        filteredByType: res.data,
        badgesToDisplay: res.data,
      });

      const endpoint = `${process.env.ENDPOINT}${process.env.API_ATTENDEES}/${localStorage.UUID}`;

      fetch(endpoint, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.jwt}`,
        },
      })
        .then(checkStatus)
        .then((response) => response.json())
        .then((response) => {
          this.setState({ collectedBadges: response.data.badges });
        })
        .catch((error) => this.handleError(error));
    }
  }

  handleError(error) {
    if (
      error.response &&
      error.response.statusText &&
      (error.response.statusText === 'Unauthorized' ||
        error.response.statusText === 'invalid_token') // provavelmente nao é assim
    ) {
      Router.push('/login');
    } else {
      this.setState({ error: 'Network Error' });
    }
  }

  handleButtonClick(type) {
    const { selectedButtons, existingTypes } = this.state;

    const index = selectedButtons.indexOf(type);

    if (index !== -1) {
      this.handleButtonUnclick(type);
    } else if (type === -1 || selectedButtons.length === existingTypes - 1)
      this.resetFilteredBadges();
    else this.filterBadgesByType([...selectedButtons, type]);
  }

  handleButtonUnclick(type) {
    const { selectedButtons } = this.state;

    const typesToFilter = selectedButtons.filter(
      (buttonType) => buttonType !== type,
    );

    if (typesToFilter.length === 0) this.resetFilteredBadges();
    else {
      this.filterBadgesByType(typesToFilter);
    }
  }

  resetFilteredBadges() {
    const { badges, searchExpression } = this.state;

    let badgesToDisplay = badges;

    if (searchExpression !== '')
      badgesToDisplay = this.filterBadgesByName(badges);

    this.setState({
      filteredByType: badges,
      selectedButtons: [],
      badgesToDisplay,
    });
  }

  handleSearchBarInput(value) {
    const { filteredByType } = this.state;

    const badgesByName = this.filterBadgesByName(filteredByType);

    this.setState({ badgesToDisplay: badgesByName, searchExpression: value });
  }

  filterBadgesByType(typesToFilter) {
    let badgesToDisplay;

    const { badges, searchExpression } = this.state;

    const filteredBadges = badges.filter(
      (b) => typesToFilter.indexOf(b.type) !== -1,
    );

    if (searchExpression !== '')
      badgesToDisplay = this.filterBadgesByName(filteredBadges);
    else badgesToDisplay = filteredBadges;

    this.setState({
      filteredByType: filteredBadges,
      selectedButtons: typesToFilter,
      badgesToDisplay,
    });
  }

  filterBadgesByName(badges) {
    const { searchExpression } = this.state;

    const badgesByName = badges.filter((badge) =>
      badge.name.toLowerCase().includes(searchExpression.toLowerCase()),
    );
    return badgesByName;
  }

  render() {
    const { badges, collectedBadges, badgesToDisplay, error } = this.state;

    const collected = collectedBadges.map((b) => b.id);

    return (
      <MoonstoneLayout title="badgedex">
        <this.FilterSection />
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={1}
          style={{ padding: '3rem' }}
        >
          {badges.length !== 0 &&
            badgesToDisplay.map((b) => (
              <Grid item xs={6} sm={4} md={3} lg={2}>
                <Badge
                  avatar={b.avatar}
                  found={collected.indexOf(b.id) !== -1}
                  id={b.id}
                />
              </Grid>
            ))}
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item>
            <Typography color="error">{error}</Typography>
          </Grid>
        </Grid>
      </MoonstoneLayout>
    );
  }
}

export default BadgeDex;
