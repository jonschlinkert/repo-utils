'use strict';

var fs = require('fs');
var url = require('url');
var path = require('path');
var utils = require('./lib/utils');

var repoUtils = module.exports;

/**
 * Create a github repository string from `owner/name`
 */

repo.repository = function(owner, name) {
  if (!utils.isString(owner)) {
    throw new TypeError('expected owner to be a string');
  }
  if (!utils.isString(name)) {
    throw new TypeError('expected name to be a string');
  }
  return owner + '/' + name;
};

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

repo.homepage = function(pathname, options) {
  if (!pathname) {
    throw new UtilError('url', 'expected a string or object');
  }

  var opts = utils.merge({protocol: 'https', slashes: true, hostname: 'github.com'}, options);
  opts.pathname = pathname;

  if (typeof pathname !== 'string') {
    options = pathname;
    opts.pathname = options.pathname;
  }

  return url.format(opts);
};
/**
 * Get the homepage for a repo
 *
 * @param {Object} config
 * @return {String|Null}
 */

module.exports = function homepage(repository, config) {
  if (!utils.isString(repository)) {
    throw new Error('expected a repository string in the form of "owner/repo"');
  }
  if (utils.isGithubUrl(repository)) {
    utils.parseGithubUrl(repository, config);
    repository = config.repository;
  }
  return 'https://github.com/' + utils.stripSlash(repository);
};

/**
 * Create a github repository url
 */

repo.toGithubUrl = function(repository, config) {
  if (!utils.isString(repository)) {
    throw new TypeError('expected repository to be a string');
  }
  var repo = 'https://github.com/' + repository;
  if (!config.homepage) {
    config.homepage = repo;
  }
  if (!config.bugs) {
    config.bugs = { url: repo + '/issues' };
  }
  return repo;
};

/**
 * Format the github url for a filepath in a repository
 *
 * @param {String} `repo`
 * @param {String} `pathname`
 * @return {String}
 * @api public
 */

repo.repositoryFile = function(repo, pathname, branch) {
  return 'https://github.com/' + repo + '/blob/' + (branch || 'master') + '/' + pathname;
};

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

repo.gitUrl = function(path) {
  if (!path) {
    throw new TypeError('expects a string or object.');
  }
  return repo.homepage.apply(url, arguments) + '.git';
};

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

repo.github = function(owner, repo, options) {
  if (!owner) {
    throw new TypeError('expected a string or object');
  }

  if (utils.isObject(owner)) {
    options = owner;
    owner = options.owner || options.username;
    repo = options.repo;
  }

  if (utils.isObject(repo)) {
    options = repo;
    repo = options.repo;
  }

  var pathname = repository(owner, repo, options);
  var link = homepage(pathname);

  return typeof owner === 'string'
    ? url(owner + (typeof repo === 'string' ? ('/' + repo) : ''), options)
    : url(options);
};

/**
 * Return true if the given string looks like a github URL.
 *
 * @param {String} `str`
 * @return {Boolean}
 */

repo.isGithubUrl = function(str) {
  var hosts = ['github.com', 'github.io', 'gist.github.com'];
  return hosts.indexOf(url.parse(str).host) > -1;
};

/**
 * Return true if the given string looks like a github URL.
 *
 * @param {String} `str`
 * @return {Boolean}
 */

repo.parseGithubUrl = function(str, config) {
  if (config.parsedGitHubUrl === true) return config;
  var parsed = utils.omitEmpty(utils.parseUrl(str));
  utils.define(config, 'parsedGitHubUrl', true);

  for (var key in parsed) {
    if (parsed.hasOwnProperty(key)) {
      config[key] = parsed[key];
    }
  }
  return config;
};
