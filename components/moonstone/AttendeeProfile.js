import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import MoonstoneLayout from './MoonstoneLayout';
import AttendeeInfo from './profile/AttendeeInfo';
import Badges from './profile/Badges';
import CenteredCircularProgress from '../CenteredCircularProgress';

class AttendeeProfile extends React.Component {
  constructor(props) {
    super(props);
    this.updateState = this.updateState.bind(this);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    const { UUID } = this.props;
    const endpoint = `${process.env.ENDPOINT}${process.env.API_ATTENDEES}/${UUID}`;
    fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.jwt}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          this.setState({ data: res.data });
        } else {
          Router.push('/404');
        }
      });
  }

  updateState(data) {
    this.setState({ data });
  }

  render() {
    const { data } = this.state;
    const { allowEdits, badgeSectionTitle, showMenu } = this.props;
    return (
      <MoonstoneLayout showMenu={showMenu} title="perfil">
        {data.id ? (
          <>
            <AttendeeInfo
              data={data}
              allowEdits={allowEdits}
              handleUpdateData={this.updateState}
            />
            <Badges sectionTitle={badgeSectionTitle} data={data} />
          </>
        ) : (
          <CenteredCircularProgress />
        )}
      </MoonstoneLayout>
    );
  }
}

export default AttendeeProfile;

AttendeeProfile.propTypes = {
  allowEdits: PropTypes.bool,
  showMenu: PropTypes.bool,
  badgeSectionTitle: PropTypes.string.isRequired,
  UUID: PropTypes.string.isRequired,
};
