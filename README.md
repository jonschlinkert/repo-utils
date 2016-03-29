# repo-utils [![NPM version](https://img.shields.io/npm/v/repo-utils.svg?style=flat)](https://www.npmjs.com/package/repo-utils) [![NPM downloads](https://img.shields.io/npm/dm/repo-utils.svg?style=flat)](https://npmjs.org/package/repo-utils) [![Build Status](https://img.shields.io/travis/jonschlinkert/repo-utils.svg?style=flat)](https://travis-ci.org/jonschlinkert/repo-utils)

> Utils for normalizing and formatting repo data.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install repo-utils --save
```

## Usage

```js
var repoUtils = require('repo-utils');
```

## API

### [.name](index.js#L33)

Get the `name` for a repository from: - github repository path (`owner/project-name`) - github URL - absolute file path to a directory on the local file system (`.` and `''` may be used as aliases for the current working directory)

**Params**

* `cwd` **{String}**: Absolute file path or github URL
* `returns` **{String}**: Project name

**Example**

```js
repoUtils.name(process.cwd());
//=> 'repo-utils'
repoUtils.name('.');
//=> 'repo-utils'
repoUtils.name();
//=> 'repo-utils'

repoUtils.name('https://github.com/jonschlinkert/repo-utils');
//=> 'repo-utils'
repoUtils.name('jonschlinkert/repo-utils');
//=> 'repo-utils'
```

### [.repository](index.js#L66)

Create a github repository string in the form of `owner/name`, from: - full github repository URL - object returned from `url.parse` - list of arguments in the form of `owner, name`

**Params**

* `owner` **{String}**: Repository owner
* `name` **{String}**: Repository name
* `returns` **{String}**: Reps

**Example**

```js
repoUtils.repository('jonschlinkert', 'micromatch');
//=> 'jonschlinkert/micromatch'

repoUtils.repository({owner: 'jonschlinkert', repository: 'micromatch'});
//=> 'jonschlinkert/micromatch'

repoUtils.repository('https://github.com/jonschlinkert/micromatch');
//=> 'jonschlinkert/micromatch'
```

### [.homepage](index.js#L115)

Create a `homepage` URL from a github repository path or github repository URL.

**Params**

* `repository` **{String}**: Repository in the form of `owner/project-name`
* `options` **{Object}**
* `returns` **{String}**: Formatted github homepage url.

**Example**

```js
repoUtils.homepage('jonschlinkert/repo-utils');
//=> 'https://github.com/jonchlinkert/repo-utils'
```

### [.issues](index.js#L170)

Create a GitHub `issues` URL.

**Params**

* `repository` **{String}**: Repository in the form of `owner/project-name` or full github project URL.
* `options` **{Object}**
* `returns` **{String}**

**Example**

```js
repoUtils.isses('jonschlinkert/micromatch');
//=> 'https://github.com/jonchlinkert/micromatch/issues'
```

### [.bugs](index.js#L187)

Create a GitHub `bugs` URL. Alias for [.issues](#issues).

**Params**

* `repository` **{String}**: Repository in the form of `owner/project-name`
* `options` **{Object}**
* `returns` **{String}**

**Example**

```js
repoUtils.bugs('jonschlinkert/micromatch');
//=> 'https://github.com/jonchlinkert/micromatch/issues'
```

### [.https](index.js#L205)

Create a github `https` URL.

**Params**

* `repository` **{String}**: Repository in the form of `owner/project-name`
* `options` **{Object|String}**: Options object or optional branch
* `branch` **{String}**: Optionally specify a branch
* `returns` **{String}**

**Example**

```js
repoUtils.https('jonschlinkert/micromatch');
//=> 'https://github.com/jonchlinkert/micromatch'
```

### [.travis](index.js#L229)

Create a travis URL.

**Params**

* `repository` **{String}**: Repository in the form of `owner/project-name`
* `options` **{Object|String}**: Options object or optional branch
* `branch` **{String}**: Optionally specify a branch
* `returns` **{String}**

**Example**

```js
repoUtils.travis('jonschlinkert/micromatch');
//=> 'https://travis-ci.org/jonschlinkert/micromatch'
```

### [.file](index.js#L251)

Create a URL for a file in a github repository.

**Params**

* `repository` **{String}**: Repository in the form of `owner/project-name` or full GitHub repository URL.
* `branch` **{String}**: Optionally specify a branch
* `path` **{String}**: Path to the file, relative to the repository root.
* `returns` **{String}**

**Example**

```js
repoUtils.file('https://github.com/jonschlinkert/micromatch', 'README.md');
//=> 'https://raw.githubusercontent.com/jonschlinkert/micromatch/master/README.md'

repoUtils.raw('jonschlinkert/micromatch', 'README.md');
//=> 'https://raw.githubusercontent.com/jonschlinkert/micromatch/master/README.md'
```

### [.raw](index.js#L277)

Create a github "raw" content URL.

**Params**

* `repository` **{String}**: Repository in the form of `owner/project-name`
* `options` **{Object|String}**: Options object or optional branch
* `branch` **{String}**: Optionally specify a branch
* `returns` **{String}**

**Example**

```js
repoUtils.raw('https://github.com/jonschlinkert/micromatch', 'README.md');
//=> 'https://raw.githubusercontent.com/jonschlinkert/micromatch/master/README.md'

repoUtils.raw('jonschlinkert/micromatch', 'README.md');
//=> 'https://raw.githubusercontent.com/jonschlinkert/micromatch/master/README.md'
```

### [.isGithubUrl](index.js#L300)

Return true if the given string looks like a github URL.

**Params**

* `str` **{String}**: URL to test
* `returns` **{Boolean}**

**Example**

```js
utils.isGithubUrl('https://github.com/whatever');
//=> true
utils.isGithubUrl('https://foo.com/whatever');
//=> false
```

### [.parse](index.js#L338)

Parse a GitHub repository URL or repository `owner/project-name` into an object.

**Params**

* `repositoryURL` **{String}**: Full repository URL, or repository path in the form of `owner/project-name`
* `options` **{Object}**
* `returns` **{Boolean}**

**Example**

```js
// see the tests for supported formats
repoUtils.parse('https://raw.githubusercontent.com/jonschlinkert/micromatch/master/README.md');

// results in:
{ protocol: 'https:',
  slashes: true,
  hostname: 'raw.githubusercontent.com',
  host: 'raw.githubusercontent.com',
  pathname: 'https://raw.githubusercontent.com/foo/bar/master/README.md',
  path: '/foo/bar/master/README.md',
  href: 'https://raw.githubusercontent.com/foo/bar/master/README.md',
  owner: 'foo',
  name: 'bar',
  repo: 'foo/bar',
  repository: 'foo/bar',
  branch: 'master' }
```

### [.expand](index.js#L399)

Parse a GitHub `repository` path or URL by calling `repo.parse()`, then expands it into an object of URLs. (the object also includes properties returned from `.parse()`). A file path maybe be passed as the second argument to include `raw` and `file` properties in the result.

**Params**

* `repository` **{String}**
* `file` **{String}**: Optionally pass a repository file path.
* `returns` **{String}**

**Example**

```js
// see the tests for supported formats
repoUtils.expand('https://github.com/abc/xyz.git', 'README.md');

// results in:
{ protocol: 'https:',
  slashes: true,
  hostname: 'github.com',
  host: 'github.com',
  pathname: 'https://github.com/abc/xyz.git',
  path: '/abc/xyz.git',
  href: 'https://github.com/abc/xyz.git',
  owner: 'abc',
  name: 'xyz',
  repo: 'abc/xyz',
  repository: 'abc/xyz',
  branch: 'master',
  host_api: 'api.github.com',
  host_raw: 'https://raw.githubusercontent.com',
  api: 'https://api.github.com/repos/abc/xyz',
  tarball: 'https://api.github.com/repos/abc/xyz/tarball/master',
  clone: 'https://github.com/abc/xyz',
  zip: 'https://github.com/abc/xyz/archive/master.zip',
  https: 'https://github.com/abc/xyz',
  travis: 'https://travis-ci.org/abc/xyz',
  file: 'https://github.com/abc/xyz/blob/master/README.md',
  raw: 'https://raw.githubusercontent.com/abc/xyz/master/README.md' }
```

## Coverage

As of March 28, 2016:

```
Statements   : 100% ( 131/131 )
Branches     : 100% ( 68/68 )
Functions    : 100% ( 15/15 )
Lines        : 100% ( 131/131 )
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/repo-utils/issues/new).

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install verb && npm run docs
```

Or, if [verb](https://github.com/verbose/verb) is installed globally:

```sh
$ verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/jonschlinkert/repo-utils/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v, on March 28, 2016._