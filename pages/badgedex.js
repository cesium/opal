import React from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  withWidth,
} from '@material-ui/core';
import fetch from 'isomorphic-unfetch';
// import Router from 'next/router';
import { styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MoonstoneLayout from '../components/moonstone/MoonstoneLayout';
import Badge from '../components/moonstone/Badge';
import CenteredCircularProgress from '../components/CenteredCircularProgress';
import theme from '../components/theme';
import { isJWTValid, checkUserType } from '../utils/apiRequests';
import { pushErrorPage } from '../utils/errorManagement';

const BadgesGrid = styled(Grid)({
  paddingBottom: '3rem',
  paddingTop: '3rem',
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    width: '80%',
  },
  [theme.breakpoints.up('md')]: {
    width: '75%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '75%',
  },
});

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
      isAllowed: false,
      badges: [],
      collectedBadges: [],
      filteredByType: [],
      badgesToDisplay: [],
      error: '',
      existingTypes: 6,
      selectedButtons: [],
      searchExpression: '',
      largeScreen: props.width === 'md' || props.width === 'lg',
    };
  }

  componentDidMount() {
    isJWTValid(localStorage.jwt).then((valid) => {
      if (!valid) {
        pushErrorPage('Unauthorized', 'check_badgedex');
      } else {
        checkUserType(localStorage.jwt).then((userType) => {
          switch (userType) {
            case 'company':
              pushErrorPage('Unauthorized', 'no_badgedex_company');
              break;
            default:
              this.setState({ isAllowed: true });
              break;
          }
        });
      }
    });

    window.addEventListener('resize', this.updateDimensions);

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
      .catch(() => null /* this.handleError(error) */);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth > 960) this.setState({ largeScreen: true });
    else this.setState({ largeScreen: false });
  };

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

  // handleError(error) {
  //   if (
  //     error.response &&
  //     error.response.statusText &&
  //     (error.response.statusText === 'Unauthorized' ||
  //       error.response.statusText === 'invalid_token') // provavelmente nao é assim
  //   ) {
  //     Router.push('/login');
  //   } else {
  //     this.setState({ error: 'Network Error' });
  //   }
  // }

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
    const {
      isAllowed,
      badges,
      collectedBadges,
      badgesToDisplay,
      largeScreen,
      error,
    } = this.state;

    const collected = collectedBadges.map((b) => b.id);

    return (
      <MoonstoneLayout showMenu title="badgedex">
        {isAllowed ? (
          <>
            <this.FilterSection />
            {badges.length !== 0 ? (
              <BadgesGrid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
                spacing={largeScreen ? 4 : 1}
              >
                {badgesToDisplay.map((b) => (
                  <Grid item>
                    <Badge
                      avatar={b.avatar}
                      found={collected.indexOf(b.id) !== -1}
                      id={b.id}
                    />
                  </Grid>
                ))}
              </BadgesGrid>
            ) : (
              <CenteredCircularProgress />
            )}
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <Typography color="error">{error}</Typography>
              </Grid>
            </Grid>
          </>
        ) : (
          <CenteredCircularProgress />
        )}
      </MoonstoneLayout>
    );
  }
}

export default withWidth()(BadgeDex);

BadgeDex.propTypes = {
  width: PropTypes.string,
};
