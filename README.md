# Chl.li JavaScript client

🔗 A JavaScript client for [Chl.li](https://chl.li) url shortening api.  
This package uses Axios for the requests.

## Installation

To install this package you can either use [npm](https://npmjs.com/package/chl.li) or GitHub:

```
npm install chl.li
or
git clone https://github.com/venomaze/chl.li.git
```

## Usage

We have two main methods, the first one is `shorten` and the second one is `shortenMany`.  
The first one is used to shorten just **one** URL at a time. Example:

```js
const shortener = require('chl.li');

shortener
  .shorten('https://google.com', {
    timeout: 5000,
    alias: 'google',
    expires: 15, // Minutes
  })
  .then(shortURL => console.log(`The short url is ${shortURL}`))
  .catch(err => console.log(err.message));
```

The second one can be used to shorten **multiple** URLs together. Example:

```js
const shortener = require('chl.li');

shortener
  .shortenMany(
    [
      {
        url: 'https://google.com/',
        alias: 'google',
      },
      {
        url: 'https://yahoo.com',
        alias: 'yahoo',
        expires: 10, // Minutes
      },
    ],
    {
      timeout: 5000,
    }
  )
  .then(shortURLs => {
    shortURLs.forEach(console.log);
  })
  .catch(err => console.log(err.message));
```
