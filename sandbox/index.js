const shortener = require('../src');

shortener
  .shorten('https://google.com')
  .then(url => console.log(url))
  .catch(err => console.log(err.message));

shortener
  .shorten('not-valid')
  .then(console.log)
  .catch(err => console.log(err.message));
