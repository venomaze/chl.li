const axios = require('axios');

/**
 * Create and return an Axios instance
 * @param {Number} timeout - Timeout for each request
 * @returns {Object} - Axios api instance
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
