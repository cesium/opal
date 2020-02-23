/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  Grid,
  Avatar,
  Typography,
  ListItemAvatar,
  withWidth,
  Button,
  ButtonGroup,
} from '@material-ui/core';
import { styled } from '@material-ui/styles';
import fetch from 'isomorphic-unfetch';
import Slider from 'react-slick';
// import Router from 'next/router';
import PropTypes from 'prop-types';
import MoonstoneLayout from '../components/moonstone/MoonstoneLayout';
import theme from '../components/theme';
import CenteredCircularProgress from '../components/CenteredCircularProgress';
import Link from '../components/Link';
import { isJWTValid, checkUserType } from '../utils/apiRequests';
import { pushErrorPage } from '../utils/errorManagement';

const StyledGridItem = styled(Grid)({
  paddingTop: '0.5rem',
});

const Separator = styled('div')(({ height, width, color }) => ({
  width,
  height,
  backgroundColor: color,
  overflow: 'hidden',
}));

const StyledTypography = styled(Typography)(({ bold, color }) => ({
  color: color || theme.palette.text.body,
  fontWeight: bold ? 'bold' : 'normal',
}));

const AttendeeRankTypography = styled(StyledTypography)(({ mobile }) => ({
  width: mobile ? '2rem' : '5rem',
}));

const AvatarGridItem = styled(Grid)(({ mobile }) => ({
  paddingLeft: mobile ? '0.3rem' : '1rem',
}));

const StyledGrid = styled(Grid)({
  margin: 'auto',
});

const StyledButtonGroup = styled(ButtonGroup)({
  paddingBottom: '2rem',
});

function checkStatus(response) {
  if (response.ok) {
    return response;
  }
  const error = new Error(response);
  error.response = response;
  return Promise.reject(error);
}

const limitLeaderboardSize = (users, userId, maxUsers) => {
  const attendeesRanking = users.filter((user) => !user.volunteer);
  const userRank = attendeesRanking.map((user) => user.id).indexOf(userId) + 1;

  const topUsers = attendeesRanking
    .slice(0, maxUsers)
    .map((user, i) => ({ userInfo: user, rank: i + 1, id: user.id }));

  if (userRank > maxUsers)
    topUsers[topUsers.length - 1] = {
      userInfo: attendeesRanking[userRank - 1],
      rank: userRank,
    };

  return topUsers;
};

const staffLeaderboard = (users) => {
  const staffUsers = users.filter((user) => user.volunteer);

  return staffUsers.map((user, i) => ({
    userInfo: user,
    rank: i + 1,
    id: user.id,
  }));
};

const split = (users, chunkSize) => {
  const response = [];
  for (let i = 0; i < users.length; i += chunkSize)
    response.push(users.slice(i, i + chunkSize));
  return response;
};

function StyledUpArrow(props) {
  const { className, style, onClick, mobile } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        left: mobile ? '-15%' : '-10%',
        transform: 'rotate(90deg)',
      }}
      onClick={onClick}
      // The following atattributes are used to solve linter problems
      role="button"
      tabIndex={0}
      aria-label="Next"
      onKeyPress={() => {}}
    />
  );
}

function StyledDownArrow(props) {
  const { className, style, onClick, mobile } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        right: mobile ? '-15%' : '-10%',
        transform: 'rotate(90deg)',
      }}
      onClick={onClick}
      // The following atattributes are used to solve linter problems
      role="button"
      tabIndex={0}
      aria-label="Next"
      onKeyPress={() => {}}
    />
  );
}

const TableHeader = () => {
  return (
    <Grid container justify="flex-start" alignItems="center" xs={12}>
      <Grid item xs>
        <StyledTypography
          color={theme.palette.primary.main}
          variant="body1"
          bold
        >
          POSIÇÃO
        </StyledTypography>
      </Grid>
      <Grid item xs>
        <StyledTypography variant="body1" align="center" bold>
          NOME
        </StyledTypography>
      </Grid>
      <Grid item xs>
        <StyledTypography
          color={theme.palette.primary.main}
          align="right"
          variant="body1"
          bold
        >
          Nº BADGES
        </StyledTypography>
      </Grid>
      <StyledGridItem item xs={12}>
        <Separator
          color={theme.palette.primary.main}
          width="100%"
          height="0.15rem"
        />
      </StyledGridItem>
    </Grid>
  );
};

const LeaderboardLine = ({ position, attendee, currentUser, mobile }) => {
  return (
    <Grid
      container
      justify={mobile ? 'space-around' : 'flex-start'}
      alignItems="center"
      xs={12}
    >
      <Grid item>
        <AttendeeRankTypography
          color={theme.palette.primary.main}
          variant="body1"
          align="center"
          bold
          mobile={mobile}
        >
          {`${position}º`}
        </AttendeeRankTypography>
      </Grid>
      {!mobile && (
        <Grid item>
          <Separator
            color={theme.palette.primary.main}
            width="0.1rem"
            height="2rem"
          />
        </Grid>
      )}
      <AvatarGridItem item mobile={mobile}>
        <ListItemAvatar>
          <Avatar src={attendee.avatar} />
        </ListItemAvatar>
      </AvatarGridItem>
      <Grid item xs={6}>
        <StyledTypography
          variant="body1"
          color={
            currentUser ? theme.palette.primary.main : theme.palette.text.body
          }
          bold={currentUser}
          noWrap
        >
          {attendee.nickname || attendee.name}
        </StyledTypography>
      </Grid>
      <Grid item xs>
        <StyledTypography
          color={theme.palette.primary.main}
          align="right"
          variant="body1"
          bold
        >
          {attendee.badges}
        </StyledTypography>
      </Grid>
    </Grid>
  );
};

const userSlide = (users, userId, pageSize) => {
  const ids = users.map((user) => user.userInfo.id);
  let slide = Math.floor(ids.indexOf(userId) / pageSize);
  if (slide < 0 || slide > Math.floor(users.length / pageSize)) slide = 0;
  return slide;
};

const LeaderboardTable = ({ users, userId, pageSize, mobile }) => {
  return (
    <Grid item>
      <Slider
        speed={500}
        infinite={false}
        vertical
        dots
        verticalSwiping
        initialSlide={userSlide(users, userId, pageSize)}
        nextArrow={<StyledDownArrow mobile={mobile} />}
        prevArrow={<StyledUpArrow mobile={mobile} />}
      >
        {split(users, pageSize).map((chunk) => (
          <Grid>
            {chunk.map((user) => (
              <Grid item>
                <Link href={`/user/${user.id}`}>
                  <LeaderboardLine
                    position={user.rank}
                    attendee={user.userInfo}
                    currentUser={user.userInfo.id === userId}
                    mobile={mobile}
                  />
                </Link>
              </Grid>
            ))}
          </Grid>
        ))}
      </Slider>
    </Grid>
  );
};

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAllowed: false,
      users: [],
      attendeesRanking: [],
      staffRanking: [],
      id: '',
      error: '',
      chunkSize: 10,
      maxUsers: 50,
      mobile: props.width === 'xs',
      board: 0,
      isVolunteer: false,
    };
  }

  componentDidMount() {
    isJWTValid(localStorage.jwt).then((valid) => {
      if (!valid) {
        pushErrorPage('Unauthorized', 'check_leaderboard');
      } else {
        checkUserType(localStorage.jwt).then((userType) => {
          switch (userType) {
            case 'company':
              pushErrorPage('Unauthorized', 'no_leaderboard_company');
              break;
            default:
              this.setState({ isAllowed: true });
              break;
          }
        });
      }
    });

    window.addEventListener('resize', this.updateDimensions);

    const endpoint = process.env.ENDPOINT + process.env.API_LEADERBOARD;

    fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.jwt}`,
      },
    })
      .then(checkStatus)
      .then((res) => res.json())
      .then((res) => {
        this.handleRanking(res);
      })
      .catch(() => null /* this.handleError(error) */);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth < 600) this.setState({ mobile: true });
    else this.setState({ mobile: false });
  };

  handleRanking(users) {
    const { maxUsers } = this.state;

    if (users.data) {
      const attendeesRanking = limitLeaderboardSize(
        users.data,
        localStorage.UUID,
        maxUsers,
      );

      const currUser = users.data.filter(
        (user) => user.id === localStorage.UUID,
      );

      const isVolunteer = currUser[0].volunteer;

      const staffRanking = staffLeaderboard(users.data);

      this.setState({
        users: users.data,
        attendeesRanking,
        staffRanking,
        error: '',
        id: localStorage.UUID,
        isVolunteer,
      });
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

  displayAttendeesBoard() {
    this.setState({ board: 0 });
  }

  displayStaffBoard() {
    this.setState({ board: 1 });
  }

  render() {
    const {
      isAllowed,
      users,
      attendeesRanking,
      staffRanking,
      error,
      id,
      chunkSize,
      board,
      mobile,
      isVolunteer,
    } = this.state;

    return (
      <MoonstoneLayout showMenu title="leaderboard">
        {isAllowed ? (
          <>
            <StyledGrid
              container
              direction="column"
              justify="center"
              align="center"
              xs={9}
              sm={7}
              md={6}
              lg={5}
              spacing={mobile ? '1' : '0'}
            >
              {isVolunteer && (
                <Grid item>
                  <StyledButtonGroup
                    fullWidth
                    size="medium"
                    aria-label="medium outlined button group"
                  >
                    <Button
                      variant={board === 0 ? 'contained' : 'outlined'}
                      color="primary"
                      onClick={() => this.displayAttendeesBoard()}
                    >
                      Participantes
                    </Button>
                    <Button
                      variant={board === 1 ? 'contained' : 'outlined'}
                      color="primary"
                      onClick={() => this.displayStaffBoard()}
                    >
                      Staff
                    </Button>
                  </StyledButtonGroup>
                </Grid>
              )}
              <Grid item>
                <TableHeader />
              </Grid>
              {users.length !== 0 ? (
                board === 0 ? (
                  <LeaderboardTable
                    users={attendeesRanking}
                    userId={id}
                    pageSize={chunkSize}
                    mobile={mobile}
                  />
                ) : (
                  <LeaderboardTable
                    users={staffRanking}
                    userId={id}
                    pageSize={chunkSize}
                    mobile={mobile}
                  />
                )
              ) : (
                <CenteredCircularProgress />
              )}
            </StyledGrid>
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

export default withWidth()(Leaderboard);

Leaderboard.propTypes = {
  width: PropTypes.string,
};

LeaderboardLine.propTypes = {
  position: PropTypes.number,
  attendee: PropTypes.object.isRequired,
  currentUser: PropTypes.bool,
  mobile: PropTypes.bool,
};

StyledUpArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  mobile: PropTypes.bool,
};

StyledDownArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  mobile: PropTypes.bool,
};

LeaderboardTable.propTypes = {
  users: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  mobile: PropTypes.bool.isRequired,
};
