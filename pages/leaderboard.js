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
import Router from 'next/router';
import PropTypes from 'prop-types';
import MoonstoneLayout from '../components/moonstone/MoonstoneLayout';
import theme from '../components/theme';

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
    .map((user, i) => ({ userInfo: user, rank: i + 1 }));

  if (userRank > maxUsers)
    topUsers[topUsers.length - 1] = {
      userInfo: attendeesRanking[userRank - 1],
      rank: userRank,
    };

  return topUsers;
};

const split = (users, chunkSize) => {
  const response = [];
  for (let i = 0; i < users.length; i += chunkSize)
    response.push(users.slice(i, i + chunkSize));
  return response;
};

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
          {attendee.nickname}
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

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      id: '',
      error: '',
      chunkSize: 10,
      maxUsers: 20,
      mobile: props.width === 'xs',
      board: 0,
    };
    // this.filterBadges = debounce(this.filterBadges, 500);
  }

  componentDidMount() {
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
        this.handleLeaderBoard(res);
      })
      .catch((error) => this.handleError(error));
  }

  handleLeaderBoard(users) {
    const { maxUsers } = this.state;

    if (users.data) {
      const limitedUsers = limitLeaderboardSize(
        users.data,
        localStorage.UUID,
        maxUsers,
      );

      this.setState({ users: limitedUsers, error: '', id: localStorage.UUID });
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

  userSlide() {
    const { users, id, chunkSize } = this.state;
    const ids = users.map((user) => user.userInfo.id);
    const slide = Math.floor(ids.indexOf(id) / chunkSize);
    return slide;
  }

  changeBoard() {
    const { board } = this.state;
    const newBoard = (board + 1) % 2;
    console.log(newBoard);
    this.setState({ board: newBoard });
  }

  render() {
    const { users, error, id, chunkSize, board,mobile } = this.state;

    return (
      <MoonstoneLayout title="leaderboard">
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
          <Grid item>
            <ButtonGroup size="small" aria-label="small outlined button group">
              <Button onClick={() => this.changeBoard()}>Participantes</Button>
              <Button width="50px">
                Staff
                <span />
                <span />
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item>
            <TableHeader />
          </Grid>
          <Grid item>
            {users.length !== 0 && (
              <Slider
                speed={500}
                infinite={false}
                vertical
                dots
                verticalSwiping
                initialSlide={this.userSlide()}
                nextArrow={<StyledDownArrow mobile={mobile} />}
                prevArrow={<StyledUpArrow mobile={mobile} />}
              >
                {split(users, chunkSize).map((chunk) => (
                  <Grid>
                    {chunk.map((user) => (
                      <Grid item>
                        <LeaderboardLine
                          position={user.rank}
                          attendee={user.userInfo}
                          currentUser={user.userInfo.id === id}
                          mobile={mobile}
                        />
                      </Grid>
                    ))}
                  </Grid>
                ))}
              </Slider>
            )}
          </Grid>
        </StyledGrid>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item>
            <Typography color="error">{error}</Typography>
          </Grid>
        </Grid>
      </MoonstoneLayout>
    );
  }
}

export default withWidth()(Leaderboard);

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
