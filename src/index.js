const axios = require('axios');
const isURL = require('is-url');

class ServiceError extends Error {}

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

const shorten = async (destination, options = {}) => {
  if (!isURL(destination)) {
    throw new Error('The URL is not valid.');
  }

  const timeout = options.timeout || 5000;
  const alias = options.alias || ''; // Default: Random alias
  const expires = options.expires || 0; // In minutes, Default: Never expire
  const api = createAPI(timeout);

  try {
    const res = await api.post('/shorten', {
      url: destination,
      alias,
      expires,
    });
    const { data } = res;
    const shortURL = `https://chl.li/${data.alias}`;

    return shortURL;
  } catch (err) {
    if (err.response && err.response.status === 400) {
      const { data } = err.response;
      const error = `${data[0].field}: ${data[0].message}`;

      throw new ServiceError(error);
    }

    throw new Error(err);
  }
};

const shortenMany = (destinations, options) => {
  const promises = [];
  const timeout = options.timeout || 5000;

  destinations.forEach(destination => {
    const shortenPromise = shorten(destination.url, {
      timeout,
      alias: destination.alias,
      expires: destination.expires,
    });

    promises.push(shortenPromise);
  });

  return Promise.all(promises);
};

const isServiceError = err => err instanceof ServiceError;

module.exports.shorten = shorten;
module.exports.shortenMany = shortenMany;
module.exports.isServiceError = isServiceError;
