const axios = require('axios');

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

const shorten = async (url, options) => {
  const timeout = options.timeout || 5000;
  const alias = options.alias || ''; // Default: Random alias
  const expires = options.expires || 0; // In minutes, Default: Never expire
  const api = createAPI(timeout);

  try {
    const res = await api.post({
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

module.expires.shorten = shorten;
