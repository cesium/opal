const { parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');

module.exports = {
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

    return config;
  },
  env: {
    ENDPOINT: process.env.ENDPOINT,
    API_AUTH_SIGN_IN: process.env.API_AUTH_SIGN_IN,
    API_AUTH_SIGN_UP: process.env.API_AUTH_SIGN_UP,
    API_AUTH_RESET_PASSWORD: process.env.API_AUTH_RESET_PASSWORD,
    API_USER_INFO: process.env.API_USER_INFO,
    API_REFERRALS: process.env.API_REFERRALS,
    API_BADGES: process.env.API_BADGES,
    API_ATTENDEE: process.env.API_ATTENDEE,
    API_ATTENDEES: process.env.API_ATTENDEES,
    API_LEADERBOARD: process.env.API_LEADERBOARD,
    API_COMPANIES: process.env.API_COMPANIES,
    API_REDEEMS: process.env.API_REDEEMS,
  },
};
