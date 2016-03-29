'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Module depedencies
 */

require('git-config-path');
require('is-absolute');
require('kind-of', 'typeOf');
require('mixin-deep', 'merge');
require('omit-empty');
require('parse-author');
require('parse-git-config');
require('parse-github-url');
require('project-name', 'project');
require = fn;

/**
 * Return true if `val` is an object
 */

utils.isObject = function(val) {
  return utils.typeOf(val) === 'object';
};

/**
 * Return true if `val` is a string with a non-zero length
 */

utils.isString = function(val) {
  return val && typeof val === 'string';
};

/**
 * Expose `utils`
 */

module.exports = utils;
