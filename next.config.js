const { parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');

module.exports = {
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

    return config;
  },
  env: {
    ENDPOINT: process.env.ENDPOINT,
    API_AUTH_SIGN_IN: '/api/auth/sign_in',
    API_AUTH_SIGN_UP: '/api/auth/sign_up',
    API_AUTH_RESET_PASSWORD: '/api/auth/passwords',
    API_USER_INFO: '/api/v1/user',
    API_REFERRALS: '/api/v1/referrals',
    API_BADGES: '/api/v1/badges',
    API_ATTENDEE: '/api/v1/attendee',
    API_ATTENDEES: '/api/v1/attendees',
    API_LEADERBOARD: '/api/v1/leaderboard',
    API_COMPANIES: '/api/v1/companies',
    API_REDEEMS: '/api/v1/redeems',
    API_COMPANY: '/api/v1/company',
    API_IS_REGISTERED: '/api/v1/is_registered',
  },
};
