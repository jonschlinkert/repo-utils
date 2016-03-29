/*!
 * repo-utils <https://github.com/jonschlinkert/repo-utils>
 *
 * Copyright (c) 2015 Jon Schlinkert
 * Released under the MIT License
 */

'use strict';

var url = require('url');
var assert = require('assert');
var repo = require('./');

describe('.name', function() {
  it('should get the project name from the cwd', function() {
    assert.equal(repo.name(), 'repo-utils');
    assert.equal(repo.name('.'), 'repo-utils');
    assert.equal(repo.name(''), 'repo-utils');
    assert.equal(repo.name(process.cwd()), 'repo-utils');
  });

  it('should get the project name from a github url', function() {
    assert.equal(repo.name('https://github.com/foo/bar'), 'bar');
  });

  it('should get the project name from a github repository path', function() {
    assert.equal(repo.name('foo/bar'), 'bar');
  });

  it('should get the project name from a parsed repository URL', function() {
    var parsed = url.parse('https://github.com/abc/xyz');
    assert.equal(repo.name(parsed), 'xyz');
  });
});

describe('.repository', function() {
  it('should create a repository from a string', function() {
    assert.equal(repo.repository('abc', 'xyz'), 'abc/xyz');
    assert.equal(repo.repository('abc/xyz'), 'abc/xyz');
  });

  it('should create a repository from an object', function() {
    assert.equal(repo.repository({owner: 'abc', name: 'xyz'}), 'abc/xyz');
    assert.equal(repo.repository({repository: 'abc/xyz'}), 'abc/xyz');
    assert.equal(repo.repository({repository: 'abc'}), 'abc');
    assert.equal(repo.repository({pathname: 'abc/xyz'}), 'abc/xyz');
    assert.equal(repo.repository({pathname: 'abc'}), 'abc');
  });

  it('should create a repository from a full url', function() {
    assert.equal(repo.repository('https://github.com/abc/xyz'), 'abc/xyz');
  });

  it('should throw an error when owner is not passed', function(cb) {
    try {
      repo.repository();
      cb(new Error('expected an error'));
    } catch (err) {
      assert.equal(err.message, 'expected owner to be a string');
      cb();
    }
  });
});

describe('.repository', function() {
  it('should create a homepage from a string', function() {
    assert.equal(repo.homepage('abc', 'xyz'), 'https://github.com/abc/xyz');
    assert.equal(repo.homepage('abc/xyz'), 'https://github.com/abc/xyz');
    assert.equal(repo.homepage('abc'), 'https://github.com/abc');
  });

  it('should create a homepage from an object', function() {
    assert.equal(repo.homepage({repository: 'abc/xyz'}), 'https://github.com/abc/xyz');
    assert.equal(repo.homepage({repository: 'abc'}), 'https://github.com/abc');
    assert.equal(repo.homepage({pathname: 'abc/xyz'}), 'https://github.com/abc/xyz');
    assert.equal(repo.homepage({pathname: 'abc'}), 'https://github.com/abc');
  });

  it('should create a homepage url from a `url.parse` object', function() {
    assert.equal(repo.homepage(url.parse('https://github.com/abc/xyz')), 'https://github.com/abc/xyz');
    assert.equal(repo.homepage(url.parse('git://github.com/abc/xyz')), 'git://github.com/abc/xyz');
  });

  it('should use the protocol passed on the options', function() {
    assert.equal(repo.homepage(url.parse('git://github.com/abc/xyz'), {protocol: 'https:'}), 'https://github.com/abc/xyz');
  });

  it('should create a homepage from a string and options object', function() {
    assert.equal(repo.homepage('abc/xyz', {hostname: 'foo.com'}), 'https://foo.com/abc/xyz');
  });

  it('should create a homepage from a full url', function() {
    assert.equal(repo.homepage('https://github.com/abc/xyz'), 'https://github.com/abc/xyz');
  });

  it('should throw an error when incorrect args are passed', function(cb) {
    try {
      repo.homepage();
      cb(new Error('expected an error'));
    } catch (err) {
      assert.equal(err.message, 'expected a repository string in the form of "owner/repo"');
      cb();
    }
  });
});

describe('.parse', function() {
  it('should parse a git remote url', function() {
    var urls = repo.parse('https://github.com/abc/xyz.git');
    assert.equal(urls.owner, 'abc');
    assert.equal(urls.name, 'xyz');
    assert.equal(urls.repo, 'abc/xyz');
    assert.equal(urls.repository, 'abc/xyz');
    assert.equal(urls.branch, 'master');
    assert.equal(urls.protocol, 'https:');
    assert.equal(urls.path, '/abc/xyz.git');
    assert.equal(urls.host, 'github.com');
  });

  it('should parse a github url', function() {
    var urls = repo.parse('https://github.com/abc/xyz');
    assert.equal(urls.owner, 'abc');
    assert.equal(urls.name, 'xyz');
    assert.equal(urls.repo, 'abc/xyz');
    assert.equal(urls.repository, 'abc/xyz');
    assert.equal(urls.branch, 'master');
    assert.equal(urls.protocol, 'https:');
    assert.equal(urls.path, '/abc/xyz');
    assert.equal(urls.host, 'github.com');
  });

  it('should parse a non-github url', function() {
    var urls = repo.parse('https://foo.com/abc/xyz');
    assert.equal(urls.owner, 'abc');
    assert.equal(urls.name, 'xyz');
    assert.equal(urls.repo, 'abc/xyz');
    assert.equal(urls.repository, 'abc/xyz');
    assert.equal(urls.branch, 'master');
    assert.equal(urls.protocol, 'https:');
    assert.equal(urls.path, '/abc/xyz');
    assert.equal(urls.host, 'foo.com');
  });

  it('should parse a github content url', function() {
    var urls = repo.parse('https://raw.githubusercontent.com/foo/bar/master/README.md');
    assert.equal(urls.owner, 'foo');
    assert.equal(urls.name, 'bar');
    assert.equal(urls.repo, 'foo/bar');
    assert.equal(urls.repository, 'foo/bar');
    assert.equal(urls.branch, 'master');
    assert.equal(urls.protocol, 'https:');
    assert.equal(urls.path, '/foo/bar/master/README.md');
    assert.equal(urls.host, 'raw.githubusercontent.com');
  });

  it('should parse a github url from a repository path', function() {
    var urls = repo.parse('abc/xyz');
    assert.equal(urls.owner, 'abc');
    assert.equal(urls.name, 'xyz');
    assert.equal(urls.repo, 'abc/xyz');
    assert.equal(urls.repository, 'abc/xyz');
    assert.equal(urls.branch, 'master');
    assert.equal(urls.protocol, 'https:');
    assert.equal(urls.path, '/abc/xyz');
    assert.equal(urls.host, 'github.com');
  });

  it('should throw an error when owner is not passed', function(cb) {
    try {
      repo.parse();
      cb(new Error('expected an error'));
    } catch (err) {
      assert.equal(err.message, 'expected repository URL to be a string');
      cb();
    }
  });
});

describe('.expand', function() {
  it('should expand a github url', function() {
    var urls = repo.expand('https://github.com/abc/xyz');
    assert.equal(urls.host_api, 'api.github.com');
    assert.equal(urls.host_raw, 'https://raw.githubusercontent.com');
    assert.equal(urls.api, 'https://api.github.com/repos/abc/xyz');
    assert.equal(urls.tarball, 'https://api.github.com/repos/abc/xyz/tarball/master');
    assert.equal(urls.zip, 'https://github.com/abc/xyz/archive/master.zip');
    assert.equal(urls.clone, 'https://github.com/abc/xyz');
    assert.equal(urls.travis, 'https://travis-ci.org/abc/xyz');
    assert.equal(urls.https, 'https://github.com/abc/xyz');
  });

  it('should expand a non-github url', function() {
    var urls = repo.expand('https://foo.com/abc/xyz');
    assert.equal(urls.host_api, 'foo.com/api/v3');
    assert.equal(urls.host_raw, 'https://raw.githubusercontent.com');
    assert.equal(urls.api, 'https://foo.com/api/v3/repos/abc/xyz');
    assert.equal(urls.tarball, 'https://foo.com/api/v3/repos/abc/xyz/tarball/master');
    assert.equal(urls.zip, 'https://github.com/abc/xyz/archive/master.zip');
    assert.equal(urls.clone, 'https://github.com/abc/xyz');
    assert.equal(urls.travis, 'https://travis-ci.org/abc/xyz');
    assert.equal(urls.https, 'https://foo.com/abc/xyz');
  });

  it('should expand a git remote url', function() {
    var urls = repo.expand('https://github.com/abc/xyz.git');
    assert.equal(urls.host_api, 'api.github.com');
    assert.equal(urls.host_raw, 'https://raw.githubusercontent.com');
    assert.equal(urls.api, 'https://api.github.com/repos/abc/xyz');
    assert.equal(urls.tarball, 'https://api.github.com/repos/abc/xyz/tarball/master');
    assert.equal(urls.zip, 'https://github.com/abc/xyz/archive/master.zip');
    assert.equal(urls.clone, 'https://github.com/abc/xyz');
    assert.equal(urls.travis, 'https://travis-ci.org/abc/xyz');
    assert.equal(urls.https, 'https://github.com/abc/xyz');
  });

  it('should expand a repository file path', function() {
    var urls = repo.expand('https://github.com/abc/xyz.git', 'README.md');
    assert.equal(urls.file, 'https://github.com/abc/xyz/blob/master/README.md');
    assert.equal(urls.raw, 'https://raw.githubusercontent.com/abc/xyz/master/README.md');
    assert.equal(urls.host_api, 'api.github.com');
    assert.equal(urls.host_raw, 'https://raw.githubusercontent.com');
    assert.equal(urls.api, 'https://api.github.com/repos/abc/xyz');
    assert.equal(urls.tarball, 'https://api.github.com/repos/abc/xyz/tarball/master');
    assert.equal(urls.zip, 'https://github.com/abc/xyz/archive/master.zip');
    assert.equal(urls.clone, 'https://github.com/abc/xyz');
    assert.equal(urls.travis, 'https://travis-ci.org/abc/xyz');
    assert.equal(urls.https, 'https://github.com/abc/xyz');
  });

  it('should expand a github url with branch', function() {
    var urls = repo.expand('https://github.com/abc/xyz/tree/0.5.0');
    assert.equal(urls.host_api, 'api.github.com');
    assert.equal(urls.host_raw, 'https://raw.githubusercontent.com');
    assert.equal(urls.api, 'https://api.github.com/repos/abc/xyz');
    assert.equal(urls.tarball, 'https://api.github.com/repos/abc/xyz/tarball/0.5.0');
    assert.equal(urls.zip, 'https://github.com/abc/xyz/archive/0.5.0.zip');
    assert.equal(urls.clone, 'https://github.com/abc/xyz');
    assert.equal(urls.travis, 'https://travis-ci.org/abc/xyz?branch=0.5.0');
    assert.equal(urls.https, 'https://github.com/abc/xyz/blob/0.5.0');
  });

  it('should expand repository path', function() {
    var urls = repo.expand('abc/xyz');
    assert.equal(urls.host_api, 'api.github.com');
    assert.equal(urls.host_raw, 'https://raw.githubusercontent.com');
    assert.equal(urls.api, 'https://api.github.com/repos/abc/xyz');
    assert.equal(urls.tarball, 'https://api.github.com/repos/abc/xyz/tarball/master');
    assert.equal(urls.zip, 'https://github.com/abc/xyz/archive/master.zip');
    assert.equal(urls.clone, 'https://github.com/abc/xyz');
    assert.equal(urls.travis, 'https://travis-ci.org/abc/xyz');
    assert.equal(urls.https, 'https://github.com/abc/xyz');
  });

  it('should expand repository path with branch', function() {
    var urls = repo.expand('abc/xyz#dev');
    assert.equal(urls.host_api, 'api.github.com');
    assert.equal(urls.host_raw, 'https://raw.githubusercontent.com');
    assert.equal(urls.api, 'https://api.github.com/repos/abc/xyz');
    assert.equal(urls.tarball, 'https://api.github.com/repos/abc/xyz/tarball/dev');
    assert.equal(urls.zip, 'https://github.com/abc/xyz/archive/dev.zip');
    assert.equal(urls.clone, 'https://github.com/abc/xyz');
    assert.equal(urls.travis, 'https://travis-ci.org/abc/xyz?branch=dev');
    assert.equal(urls.https, 'https://github.com/abc/xyz/blob/dev');
  });

  it('should expand a git+https url', function() {
    var urls = repo.expand('git+https://github.com/abc/xyz.git');
    assert.equal(urls.host_api, 'api.github.com');
    assert.equal(urls.host_raw, 'https://raw.githubusercontent.com');
    assert.equal(urls.api, 'https://api.github.com/repos/abc/xyz');
    assert.equal(urls.tarball, 'https://api.github.com/repos/abc/xyz/tarball/master');
    assert.equal(urls.zip, 'https://github.com/abc/xyz/archive/master.zip');
    assert.equal(urls.clone, 'https://github.com/abc/xyz');
    assert.equal(urls.travis, 'https://travis-ci.org/abc/xyz');
    assert.equal(urls.https, 'git+https://github.com/abc/xyz');
  });

  it('should expand a git:// url', function() {
    var urls = repo.expand('git://github.com/abc/xyz.git');
    assert.equal(urls.host_api, 'api.github.com');
    assert.equal(urls.host_raw, 'https://raw.githubusercontent.com');
    assert.equal(urls.api, 'https://api.github.com/repos/abc/xyz');
    assert.equal(urls.tarball, 'https://api.github.com/repos/abc/xyz/tarball/master');
    assert.equal(urls.zip, 'https://github.com/abc/xyz/archive/master.zip');
    assert.equal(urls.clone, 'https://github.com/abc/xyz');
    assert.equal(urls.travis, 'https://travis-ci.org/abc/xyz');
    assert.equal(urls.https, 'git://github.com/abc/xyz');
  });

  it('should support branches', function() {
    var urls = repo.expand('git://github.com/abc/xyz.git');
    assert.equal(urls.host_api, 'api.github.com');
    assert.equal(urls.host_raw, 'https://raw.githubusercontent.com');
    assert.equal(urls.api, 'https://api.github.com/repos/abc/xyz');
    assert.equal(urls.tarball, 'https://api.github.com/repos/abc/xyz/tarball/master');
    assert.equal(urls.zip, 'https://github.com/abc/xyz/archive/master.zip');
    assert.equal(urls.clone, 'https://github.com/abc/xyz');
    assert.equal(urls.travis, 'https://travis-ci.org/abc/xyz');
    assert.equal(urls.https, 'git://github.com/abc/xyz');
  });
});

describe('.isGithubUrl', function() {
  it('should return true if a URL is a github url', function() {
    assert(repo.isGithubUrl('https://github.com/abc/xyz'));
    assert(repo.isGithubUrl('https://raw.githubusercontent.com'));
    assert(repo.isGithubUrl('https://api.github.com/repos/abc/xyz'));
    assert(repo.isGithubUrl('https://api.github.com/repos/abc/xyz/tarball/master'));
    assert(repo.isGithubUrl('https://github.com/abc/xyz/archive/master.zip'));
    assert(repo.isGithubUrl('https://github.com/abc/xyz'));
    assert(repo.isGithubUrl('https://github.com/abc/xyz'));
  });

  it('should return false if a URL is not a github url', function() {
    assert(!repo.isGithubUrl('https://travis-ci.org/abc/xyz'));
  });
});

describe('.https', function() {
  it('should create a github https url from repository path', function() {
    assert.equal(repo.https('abc/xyz'), 'https://github.com/abc/xyz');
  });

  it('should create a github https url from repository URL', function() {
    assert.equal(repo.https('https://github.com/abc/xyz'), 'https://github.com/abc/xyz');
  });
});

describe('.file', function() {
  it('should create a github file url from repository path', function() {
    assert.equal(repo.file('abc/xyz', 'README.md'), 'https://github.com/abc/xyz/blob/master/README.md');
  });

  it('should create a github file url from repository URL', function() {
    assert.equal(repo.file('https://github.com/abc/xyz', 'LICENSE'), 'https://github.com/abc/xyz/blob/master/LICENSE');
  });
});

describe('.raw', function() {
  it('should create a github raw url from repository path', function() {
    assert.equal(repo.raw('abc/xyz', 'README.md'), 'https://raw.githubusercontent.com/abc/xyz/master/README.md');
  });

  it('should create a github raw url from repository URL', function() {
    assert.equal(repo.raw('https://github.com/abc/xyz', 'LICENSE'), 'https://raw.githubusercontent.com/abc/xyz/master/LICENSE');
  });
});

describe('.issues', function() {
  it('should create a github issues url from repository path', function() {
    assert.equal(repo.issues('abc/xyz'), 'https://github.com/abc/xyz/issues');
  });

  it('should create a github issues url from repository URL', function() {
    assert.equal(repo.issues('https://github.com/abc/xyz'), 'https://github.com/abc/xyz/issues');
  });
});

describe('.bugs', function() {
  it('should create a github bugs url from repository path', function() {
    assert.equal(repo.bugs('abc/xyz'), 'https://github.com/abc/xyz/issues');
  });

  it('should create a github bugs url from repository URL', function() {
    assert.equal(repo.bugs('https://github.com/abc/xyz'), 'https://github.com/abc/xyz/issues');
  });
});
