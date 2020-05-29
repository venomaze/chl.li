class ValidationError extends Error {}
class ServiceError extends Error {}
class ClientError extends Error {}

module.exports.ValidationError = ValidationError;
module.exports.ServiceError = ServiceError;
module.exports.ClientError = ClientError;
