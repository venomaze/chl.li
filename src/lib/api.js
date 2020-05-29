const axios = require('axios');

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
