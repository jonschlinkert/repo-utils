'use strict';

var typeOf = require('kind-of');
var UtilError = require('./error');
var url = require('./url');

/**
 * Create a GitHub url.
 *
 * ```js
 * repo.github('abc/xyz');
 * //=> 'https://github.com/abc/xyz'
 *
 * repo.github('abc', 'xyz');
 * //=> 'https://github.com/abc/xyz'
 *
 * repo.github('abc');
 * //=> 'https://github.com/abc'
 *
 * repo.github('abc', {hostname: 'foo.org'});
 * //=> 'https://foo.org/abc'
 * ```
 *
 * @name github
 * @param  {String} `url` user/repo or org/repo
 * @return {String} Formatted github url
 * @api public
 */

module.exports = function github(user, repo, options) {
  if (user == null) {
    throw new UtilError('github', 'expects a string or object.');
  }

  if (typeOf(repo) === 'object') {
    options = repo;
    repo = options && options.repo;
  }

  if (typeOf(user) === 'object') {
    options = user;
    user = options && options.user || options.org;
    repo = options && options.repo;
  }

  return typeof user === 'string'
    ? url(user + (typeof repo === 'string' ? ('/' + repo) : ''), options)
    : url(options);
};
