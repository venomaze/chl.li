const isURL = require('is-url');

const { createAPI } = require('./lib/api');
const { addProtocol } = require('./lib/url');
const errors = require('./lib/errors');

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
    throw new errors.ValidationError('The URL is not valid.');
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

      throw new errors.ServiceError(error);
    }

    throw new errors.ClientError(err);
  }
};

/**
 * Shorten all the given URLs
 *
 * @param {Array} destinations An array containing all destination objects
 * @param {Object} options Options object to add a custom timeout
 */
const shortenMany = (destinations, options = {}) => {
  const promises = [];
  const timeout = options.timeout || 5000;

  destinations.forEach(destination => {
    const url = addProtocol(destination.url);
    const alias = destination.alias || ''; // Default: Random alias
    const expires = destination.expires || 0; // In minutes, Default: Never expire

    if (!isURL(url)) {
      const error = new errors.ValidationError('The URL is not valid.');
      const rejectedPromise = Promise.reject(error);

      return promises.push(rejectedPromise);
    }

    const shortenPromise = shorten(url, {
      timeout,
      expires,
      alias,
    });

    return promises.push(shortenPromise);
  });

  return Promise.all(promises);
};

/**
 * Check if the error is related to the service or not
 *
 * @param {Object} err The given Error object
 */
const isServiceError = err => err instanceof errors.ServiceError;

/**
 * Check if the error is related to the URL validation or not
 *
 * @param {Object} err The given Error object
 */
const isValidationError = err => err instanceof errors.ValidationError;

/**
 * Check if the error is related to the Axios client or not
 *
 * @param {Object} err The given Error object
 */
const isClientError = err => err instanceof errors.ClientError;

module.exports = {
  shorten,
  shortenMany,
  isClientError,
  isServiceError,
  isValidationError,
};
