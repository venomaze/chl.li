/**
 * Add https protocol to the url if it doesn't have it already
 *
 * @param {String} url The URL which the protocol is added to
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
