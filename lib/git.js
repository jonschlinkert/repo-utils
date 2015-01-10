'use strict';

var UtilError = require('./error');
var url = require('./url');

/**
 * Create a github `.git` url.
 *
 * ```js
 * repo.git('abc/xyz');
 * //=> 'https://github.com/abc/xyz.git'
 *
 * var url = require('url');
 * var parts = url.parse('abc/xyz');
 * repo.git(parts);
 * //=> 'https://github.com/abc/xyz.git'
 * ```
 *
 * @name git
 * @param  {String} `path` user/repo or org/repo
 * @return {String} Formatted github git url
 * @api public
 */

module.exports = function git(path) {
  if (!path) {
    throw new UtilError('git', 'expects a string or object.');
  }
  return url.apply(url, arguments) + '.git';
};
