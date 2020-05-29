const shortener = require('../src');

shortener
  .shorten('https://google.com')
  .then(url => console.log(url))
  .catch(err => console.log(err.message));

shortener
  .shorten('not-valid')
  .then(console.log)
  .catch(err => {
    if (shortener.isServiceError(err)) {
      return console.log(`Service: ${err.message}`);
    }

    return console.log(err.message);
  });

shortener
  .shorten('https://google.com', { alias: 'hello' })
  .then(console.log)
  .catch(err => {
    if (shortener.isServiceError(err)) {
      return console.log(`Service: ${err.message}`);
    }

    return console.log(err.message);
  });

shortener
  .shorten('https://google.com', { timeout: 1 })
  .then(console.log)
  .catch(err => {
    if (shortener.isServiceError(err)) {
      return console.log(`Service: ${err.message}`);
    }

    return console.log(err.message);
  });

shortener
  .shortenMany([{ url: 'google.com' }, { url: 'yahoo.com' }])
  .then(console.log)
  .catch(err => console.log(err.message));
