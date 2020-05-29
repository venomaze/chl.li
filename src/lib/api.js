const axios = require('axios');

/**
 * Create and return an Axios instance
 *
 * @param {Number} timeout The amount of timeout for each request
 */
const createAPI = timeout => {
  const api = axios.create({
    baseURL: 'https://chl.li/api/v1',
    headers: {
      'Content-Type': 'application/json',
    },
    timeout,
  });

  return api;
};

module.exports.createAPI = createAPI;
