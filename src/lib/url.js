/**
 * Add https protocol to the given url
 * @param {String} url - The URL which the protocol is going to be added to
 * @returns {String} - The URL with the added protocol
 */
const addProtocol = url => {
  const protocolRelativePattern = /^\/\/:/;
  const absolutePattern = /^http(s)?:\/\//;

  if (protocolRelativePattern.test(url)) {
    return `https${url}`;
  }

  return absolutePattern.test(url) ? url : `https://${url}`;
};

module.exports.addProtocol = addProtocol;
