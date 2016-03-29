'use strict';

var url = require('url');
var util = require('util');
var utils = require('./lib/utils');
var repo = exports = module.exports;

/**
 * Get the `name` for a repository from:
 * - github repository path (`owner/project-name`)
 * - github URL
 * - absolute file path to a directory on the local file system (`.` and `''` may be used as aliases for the current working directory)
 *
 * ```js
 * repoUtils.name(process.cwd());
 * //=> 'repo-utils'
 * repoUtils.name('.');
 * //=> 'repo-utils'
 * repoUtils.name();
 * //=> 'repo-utils'
 *
 * repoUtils.name('https://github.com/jonschlinkert/repo-utils');
 * //=> 'repo-utils'
 * repoUtils.name('jonschlinkert/repo-utils');
 * //=> 'repo-utils'
 * ```
 *
 * @param {String} `cwd` Absolute file path or github URL
 * @return {String} Project name
 * @api public
 */

repo.name = function(cwd) {
  if (cwd === '.' || cwd === '') {
    cwd = process.cwd();
  }
  if (utils.isObject(cwd) || (utils.isString(cwd) && !utils.isAbsolute(cwd))) {
    var repository = repo.repository.apply(repo, arguments);
    return repository.split('/').pop();
  }
  return utils.project(cwd);
};

/**
 * Create a github repository string in the form of `owner/name`, from:
 * - full github repository URL
 * - object returned from `url.parse`
 * - list of arguments in the form of `owner, name`
 *
 * ```js
 * repoUtils.repository('jonschlinkert', 'micromatch');
 * //=> 'jonschlinkert/micromatch'
 *
 * repoUtils.repository({owner: 'jonschlinkert', repository: 'micromatch'});
 * //=> 'jonschlinkert/micromatch'
 *
 * repoUtils.repository('https://github.com/jonschlinkert/micromatch');
 * //=> 'jonschlinkert/micromatch'
 * ```
 * @param {String} `owner` Repository owner
 * @param {String} `name` Repository name
 * @return {String} Reps
 * @api public
 */

repo.repository = function(owner, name) {
  if (utils.isObject(owner)) {
    var obj = owner;
    // support config object from parsed URL

    owner = obj.owner;
    name = obj.name || name;

    if (!utils.isString(owner)) {
      var str = obj.repository || obj.repo || obj.pathname;
      if (utils.isString(str)) {
        var parsed = repo.parse(str);
        owner = parsed.owner;
        name = name || parsed.name;
      }
    }
  }

  if (/\W/.test(owner)) {
    var parsed = repo.parse(owner);
    if (utils.isString(parsed.repository)) {
      owner = parsed.owner;
      name = parsed.name;
    }
  }

  if (!utils.isString(owner)) {
    throw new TypeError('expected owner to be a string');
  }

  return owner + (name ? '/' + name : '');
};

/**
 * Create a `homepage` URL from a github repository path or github
 * repository URL.
 *
 * ```js
 * repoUtils.homepage('jonschlinkert/repo-utils');
 * //=> 'https://github.com/jonchlinkert/repo-utils'
 * ```
 * @param {String} `repository` Repository in the form of `owner/project-name`
 * @param {Object} `options`
 * @return {String} Formatted github homepage url.
 * @api public
 */

repo.homepage = function(repository, options) {
  options = options || {};

  if (utils.isString(repository)) {
    if (utils.isString(options)) {
      repository += '/' + options;
      options = {};
    }
    options.repository = repository;
  }

  if (utils.isObject(repository)) {
    options = utils.merge({}, repository, options);
  }

  var opts = utils.omitEmpty(options);
  opts.repository = opts.repository || opts.pathname;

  if (!utils.isString(opts.repository)) {
    throw new TypeError('expected a repository string in the form of "owner/repo"');
  }

  if (!utils.isString(opts.hostname)) {
    opts.hostname = 'github.com';
  }
  if (!utils.isString(opts.protocol)) {
    opts.protocol = 'https:';
  }

  if (/[:.#]/.test(opts.repository)) {
    var parsed = repo.parse(opts.repository, opts);
    // merge opts last, but override `repository` with parsed value
    opts = utils.merge({}, parsed, opts);
    opts.repository = parsed.repository;
  }

  opts.pathname = opts.repository;
  delete opts.hash;

  return url.format(opts);
};

/**
 * Create a GitHub `issues` URL.
 *
 * ```js
 * repoUtils.isses('jonschlinkert/micromatch');
 * //=> 'https://github.com/jonchlinkert/micromatch/issues'
 * ```
 * @param {String} `repository` Repository in the form of `owner/project-name` or full github project URL.
 * @param {Object} `options`
 * @return {String}
 * @api public
 */

repo.issues = function(repository, options) {
  return repo.homepage(repository, options) + '/issues';
};

/**
 * Create a GitHub `bugs` URL. Alias for [.issues](#issues).
 *
 * ```js
 * repoUtils.bugs('jonschlinkert/micromatch');
 * //=> 'https://github.com/jonchlinkert/micromatch/issues'
 * ```
 * @param {String} `repository` Repository in the form of `owner/project-name`
 * @param {Object} `options`
 * @return {String}
 * @api public
 */

repo.bugs = function(repository, options) {
  return repo.issues(repository, options);
};

/**
 * Create a github `https` URL.
 *
 * ```js
 * repoUtils.https('jonschlinkert/micromatch');
 * //=> 'https://github.com/jonchlinkert/micromatch'
 * ```
 * @param  {String} `repository` Repository in the form of `owner/project-name`
 * @param  {Object|String} `options` Options object or optional branch
 * @param {String} `branch` Optionally specify a branch
 * @return {String}
 * @api public
 */

repo.https = function(repository, options, branch) {
  if (utils.isString(options)) {
    branch = options;
    options = {};
  }
  var homepage = repo.homepage(repository, options);
  branch = !repo.isMaster(branch) ? '/blob/' + branch : '';
  return homepage + branch;
};

/**
 * Create a travis URL.
 *
 * ```js
 * repoUtils.travis('jonschlinkert/micromatch');
 * //=> 'https://travis-ci.org/jonschlinkert/micromatch'
 * ```
 * @param  {String} `repository` Repository in the form of `owner/project-name`
 * @param  {Object|String} `options` Options object or optional branch
 * @param {String} `branch` Optionally specify a branch
 * @return {String}
 * @api public
 */

repo.travis = function(repository, branch) {
  branch = !repo.isMaster(branch) ? '?branch=' + branch : '';
  return 'https://travis-ci.org/' + repository + branch;
};

/**
 * Create a URL for a file in a github repository.
 *
 * ```js
 * repoUtils.file('https://github.com/jonschlinkert/micromatch', 'README.md');
 * //=> 'https://raw.githubusercontent.com/jonschlinkert/micromatch/master/README.md'
 *
 * repoUtils.raw('jonschlinkert/micromatch', 'README.md');
 * //=> 'https://raw.githubusercontent.com/jonschlinkert/micromatch/master/README.md'
 * ```
 * @param  {String} `repository` Repository in the form of `owner/project-name` or full GitHub repository URL.
 * @param {String} `branch` Optionally specify a branch
 * @param {String} `path` Path to the file, relative to the repository root.
 * @return {String}
 * @api public
 */

repo.file = function(repository, branch, path) {
  if (!utils.isString(path)) {
    path = branch;
    branch = 'master';
  }
  var prefix = 'https://github.com/%s/blob/%s/%s';
  return util.format(prefix, repo.repository(repository), branch, path);
};

/**
 * Create a github "raw" content URL.
 *
 * ```js
 * repoUtils.raw('https://github.com/jonschlinkert/micromatch', 'README.md');
 * //=> 'https://raw.githubusercontent.com/jonschlinkert/micromatch/master/README.md'
 *
 * repoUtils.raw('jonschlinkert/micromatch', 'README.md');
 * //=> 'https://raw.githubusercontent.com/jonschlinkert/micromatch/master/README.md'
 * ```
 * @param  {String} `repository` Repository in the form of `owner/project-name`
 * @param  {Object|String} `options` Options object or optional branch
 * @param {String} `branch` Optionally specify a branch
 * @return {String}
 * @api public
 */

repo.raw = function(repository, branch, file) {
  if (!utils.isString(file)) {
    file = branch;
    branch = 'master';
  }
  var str = 'https://raw.githubusercontent.com/%s/%s/%s';
  return util.format(str, repo.repository(repository), branch, file);
};

/**
 * Return true if the given string looks like a github URL.
 *
 * ```js
 * utils.isGithubUrl('https://github.com/whatever');
 * //=> true
 * utils.isGithubUrl('https://foo.com/whatever');
 * //=> false
 * ```
 * @param {String} `str` URL to test
 * @return {Boolean}
 * @api public
 */

repo.isGithubUrl = function(str) {
  return [
    'api.github.com',
    'gist.github.com',
    'github.com',
    'github.io',
    'raw.githubusercontent.com'
  ].indexOf(url.parse(str).host) > -1;
};

/**
 * Parse a GitHub repository URL or repository `owner/project-name` into
 * an object.
 *
 * ```js
 * // see the tests for supported formats
 * repoUtils.parse('https://raw.githubusercontent.com/jonschlinkert/micromatch/master/README.md');
 *
 * // results in:
 * { protocol: 'https:',
 *   slashes: true,
 *   hostname: 'raw.githubusercontent.com',
 *   host: 'raw.githubusercontent.com',
 *   pathname: 'https://raw.githubusercontent.com/foo/bar/master/README.md',
 *   path: '/foo/bar/master/README.md',
 *   href: 'https://raw.githubusercontent.com/foo/bar/master/README.md',
 *   owner: 'foo',
 *   name: 'bar',
 *   repo: 'foo/bar',
 *   repository: 'foo/bar',
 *   branch: 'master' }
 * ```
 * @param {String} `repositoryURL` Full repository URL, or repository path in the form of `owner/project-name`
 * @param {Object} `options`
 * @return {Boolean}
 * @api public
 */

repo.parse = function(repoUrl, options) {
  if (!utils.isString(repoUrl)) {
    throw new TypeError('expected repository URL to be a string');
  }

  var defaults = {protocol: 'https:', slashes: true, hostname: 'github.com'};
  options = utils.omitEmpty(options || {});

  if (!/:\/\//.test(repoUrl)) {
    repoUrl = 'https://github.com/' + repoUrl;
  }

  var obj = utils.omitEmpty(url.parse(repoUrl));
  var opts = utils.merge(defaults, options, obj);
  opts.pathname = repoUrl;

  var res = utils.omitEmpty(utils.parseGithubUrl(repoUrl));
  return utils.merge({}, opts, res);
};

/**
 * Parse a GitHub `repository` path or URL by calling `repo.parse()`,
 * then expands it into an object of URLs. (the object also includes
 * properties returned from `.parse()`). A file path maybe be passed
 * as the second argument to include `raw` and `file` properties in the
 * result.
 *
 * ```js
 * // see the tests for supported formats
 * repoUtils.expand('https://github.com/abc/xyz.git', 'README.md');
 *
 * // results in:
 * { protocol: 'https:',
 *   slashes: true,
 *   hostname: 'github.com',
 *   host: 'github.com',
 *   pathname: 'https://github.com/abc/xyz.git',
 *   path: '/abc/xyz.git',
 *   href: 'https://github.com/abc/xyz.git',
 *   owner: 'abc',
 *   name: 'xyz',
 *   repo: 'abc/xyz',
 *   repository: 'abc/xyz',
 *   branch: 'master',
 *   host_api: 'api.github.com',
 *   host_raw: 'https://raw.githubusercontent.com',
 *   api: 'https://api.github.com/repos/abc/xyz',
 *   tarball: 'https://api.github.com/repos/abc/xyz/tarball/master',
 *   clone: 'https://github.com/abc/xyz',
 *   zip: 'https://github.com/abc/xyz/archive/master.zip',
 *   https: 'https://github.com/abc/xyz',
 *   travis: 'https://travis-ci.org/abc/xyz',
 *   file: 'https://github.com/abc/xyz/blob/master/README.md',
 *   raw: 'https://raw.githubusercontent.com/abc/xyz/master/README.md' }
 * ```
 * @param {String} `repository`
 * @param {String} `file` Optionally pass a repository file path.
 * @return {String}
 * @api public
 */

repo.expand = function(repository, file) {
  var config = repo.parse(repository);

  repository = config.repository;
  var github = 'https://github.com';
  var branch = config.branch;

  var raw = 'https://raw.githubusercontent.com';
  var api = config.host !== 'github.com'
    ? config.host + '/api/v3'
    : 'api.github.com';

  var urls = config;
  urls.host_api = api;
  urls.host_raw = raw;
  urls.api = 'https://' + api + '/repos/' + repository;
  urls.tarball = urls.api + '/tarball/' + branch;
  urls.clone = github + '/' + repository;
  urls.zip = urls.clone + '/archive/' + branch + '.zip';

  urls.https = repo.https(config, branch);
  urls.travis = repo.travis(repository, branch);

  if (utils.isString(file)) {
    urls.file = repo.file(repository, branch, file);
    urls.raw = repo.raw(repository, branch, file);
  }
  return urls;
};

/**
 * Returns true if the given value is `master` or `undefined`. Used in other
 * methods.
 *
 * @param {String} `branch`
 * @return {Boolean}
 */

repo.isMaster = function(branch) {
  return typeof branch === 'undefined' || branch === 'master';
};
