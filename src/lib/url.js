const addProtocol = url => {
  const protocolRelativePattern = /^\/\/:/;
  const absolutePattern = /^http(s)?:\/\//;

  if (protocolRelativePattern.test(url)) {
    return `https${url}`;
  }

  return absolutePattern.test(url) ? url : `https://${url}`;
};

module.exports.addProtocol = addProtocol;
