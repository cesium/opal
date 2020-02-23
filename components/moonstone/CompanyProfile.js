import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import MoonstoneLayout from './MoonstoneLayout';
import CompanyInfo from './profile/CompanyInfo';
import CenteredCircularProgress from '../CenteredCircularProgress';

class CompanyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    const { jwt } = this.props;
    const endpoint = `${process.env.ENDPOINT}${process.env.API_COMPANY}`;
    fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          this.setState({ data: res });
        } else {
          Router.push('/404');
        }
      });
  }

  render() {
    const { data } = this.state;
    return (
      <MoonstoneLayout isCompany showMenu title="perfil">
        {data.name ? <CompanyInfo data={data} /> : <CenteredCircularProgress />}
      </MoonstoneLayout>
    );
  }
}

export default CompanyProfile;

CompanyProfile.propTypes = {
  jwt: PropTypes.string.isRequired,
};
