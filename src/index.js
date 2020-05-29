const isURL = require('is-url');

const { createAPI } = require('./lib/api');
const { addProtocol } = require('./lib/url');

class ServiceError extends Error {}

/**
 * Shorten the given URL
 *
 * @param {String} destination The destination URL
 * @param {Object} options Custom options
 */
const shorten = async (destination, options = {}) => {
  const url = addProtocol(destination);
  const timeout = options.timeout || 5000;
  const alias = options.alias || ''; // Default: Random alias
  const expires = options.expires || 0; // In minutes, Default: Never expire
  const api = createAPI(timeout);

  if (!isURL(url)) {
    throw new Error('The URL is not valid.');
  }

  try {
    const res = await api.post('/shorten', {
      url,
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

/**
 * Shorten all the given URLs
 *
 * @param {Array} destinations An array containing all destination objects
 * @param {Object} options Options object to add a custom timeout
 */
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

/**
 * Check if the error is related to the service or not
 *
 * @param {Object} err The given Error object
 */
const isServiceError = err => err instanceof ServiceError;

module.exports.shorten = shorten;
module.exports.shortenMany = shortenMany;
module.exports.isServiceError = isServiceError;
