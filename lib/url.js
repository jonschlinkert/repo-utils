'use strict';

var UtilError = require('./error');
var extend = require('extend-shallow');
var url = require('url');

/**
 * Base method used by other utils for creating a URL
 * from a string or object.
 *
 * ```js
 * repo.url('abc/xyz');
 * //=> 'https://github.com/abc/xyz'
 *
 * repo.url({pathname: 'abc/xyz'});
 * //=> 'https://github.com/abc/xyz'
 * ```
 *
 * @name url
 * @param  {String|Object} `pathname` Pathname or options object. Pathname should be user/repo or org/repo
 * @param  {Object} `options`
 * @return {String} Formatted github url
 * @api public
 */

module.exports = function(pathname, options) {
  if (!pathname) {
    throw new UtilError('url', 'expects a string or object.');
  }

  var opts = extend({protocol: 'https', slashes: true, hostname: 'github.com'}, options);
  opts.pathname = pathname;

  if (typeof pathname !== 'string') {
    options = pathname;
    opts.pathname = options.pathname;
  }

  return url.format(opts);
};
