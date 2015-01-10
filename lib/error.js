/**
 * Expose `UtilError` class
 */

module.exports = UtilError;

function UtilError(utilName, msg, actual) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = '[repo-utils#' + utilName + '] '
    + msg
    + (actual ? (': "' + actual + '"') : '');
}

UtilError.prototype.__proto__ = Error.prototype;
