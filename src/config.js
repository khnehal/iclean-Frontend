import merge from 'lodash/merge';

const browser = typeof window !== 'undefined';

const config = {
  all: {
    env: process.env.HOST_ENV || 'development',
    apiUrl: process.env.API_URL || 'http://fd60d0d9.ngrok.io',
    browser
  }
};

export default merge(config.all, config[config.all.env]);
