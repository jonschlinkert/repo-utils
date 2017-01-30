'use strict';

require('mocha');
var assert = require('assert');
var repo = require('../');

describe('.expand', function() {
  it('should expand a github url', function() {
    var urls = repo.expandUrl('https://github.com/abc/xyz');
    assert.equal(urls.host_api, 'api.github.com');
    assert.equal(urls.host_raw, 'https://raw.githubusercontent.com');
    assert.equal(urls.api, 'https://api.github.com/repos/abc/xyz');
    assert.equal(urls.tarball, 'https://api.github.com/repos/abc/xyz/tarball/master');
    assert.equal(urls.zip, 'https://github.com/abc/xyz/archive/master.zip');
    assert.equal(urls.clone, 'https://github.com/abc/xyz.git');
    assert.equal(urls.travis, 'https://travis-ci.org/abc/xyz');
    assert.equal(urls.https, 'https://github.com/abc/xyz');
  });

  it('should expand a non-github url', function() {
    var urls = repo.expandUrl('https://foo.com/abc/xyz');
    assert.equal(urls.host_api, 'foo.com/api/v3');
    assert.equal(urls.host_raw, 'https://raw.githubusercontent.com');
    assert.equal(urls.api, 'https://foo.com/api/v3/repos/abc/xyz');
    assert.equal(urls.tarball, 'https://foo.com/api/v3/repos/abc/xyz/tarball/master');
    assert.equal(urls.zip, 'https://github.com/abc/xyz/archive/master.zip');
    assert.equal(urls.clone, 'https://github.com/abc/xyz.git');
    assert.equal(urls.travis, 'https://travis-ci.org/abc/xyz');
    assert.equal(urls.https, 'https://foo.com/abc/xyz');
  });

  it('should expand a git remote url', function() {
    var urls = repo.expandUrl('https://github.com/abc/xyz.git');
    assert.equal(urls.host_api, 'api.github.com');
    assert.equal(urls.host_raw, 'https://raw.githubusercontent.com');
    assert.equal(urls.api, 'https://api.github.com/repos/abc/xyz');
    assert.equal(urls.tarball, 'https://api.github.com/repos/abc/xyz/tarball/master');
    assert.equal(urls.zip, 'https://github.com/abc/xyz/archive/master.zip');
    assert.equal(urls.clone, 'https://github.com/abc/xyz.git');
    assert.equal(urls.travis, 'https://travis-ci.org/abc/xyz');
    assert.equal(urls.https, 'https://github.com/abc/xyz');
  });

  it('should expand a repository file path', function() {
    var urls = repo.expandUrl('https://github.com/abc/xyz.git', 'README.md');
    assert.equal(urls.file, 'https://github.com/abc/xyz/blob/master/README.md');
    assert.equal(urls.raw, 'https://raw.githubusercontent.com/abc/xyz/master/README.md');
    assert.equal(urls.host_api, 'api.github.com');
    assert.equal(urls.host_raw, 'https://raw.githubusercontent.com');
    assert.equal(urls.api, 'https://api.github.com/repos/abc/xyz');
    assert.equal(urls.tarball, 'https://api.github.com/repos/abc/xyz/tarball/master');
    assert.equal(urls.zip, 'https://github.com/abc/xyz/archive/master.zip');
    assert.equal(urls.clone, 'https://github.com/abc/xyz.git');
    assert.equal(urls.travis, 'https://travis-ci.org/abc/xyz');
    assert.equal(urls.https, 'https://github.com/abc/xyz');
  });

  it('should expand a github url with branch', function() {
    var urls = repo.expandUrl('https://github.com/abc/xyz/tree/0.5.0');
    assert.equal(urls.host_api, 'api.github.com');
    assert.equal(urls.host_raw, 'https://raw.githubusercontent.com');
    assert.equal(urls.api, 'https://api.github.com/repos/abc/xyz');
    assert.equal(urls.tarball, 'https://api.github.com/repos/abc/xyz/tarball/0.5.0');
    assert.equal(urls.zip, 'https://github.com/abc/xyz/archive/0.5.0.zip');
    assert.equal(urls.clone, 'https://github.com/abc/xyz.git');
    assert.equal(urls.travis, 'https://travis-ci.org/abc/xyz?branch=0.5.0');
    assert.equal(urls.https, 'https://github.com/abc/xyz/blob/0.5.0');
  });

  it('should expand repository path', function() {
    var urls = repo.expandUrl('abc/xyz');
    assert.equal(urls.host_api, 'api.github.com');
    assert.equal(urls.host_raw, 'https://raw.githubusercontent.com');
    assert.equal(urls.api, 'https://api.github.com/repos/abc/xyz');
    assert.equal(urls.tarball, 'https://api.github.com/repos/abc/xyz/tarball/master');
    assert.equal(urls.zip, 'https://github.com/abc/xyz/archive/master.zip');
    assert.equal(urls.clone, 'https://github.com/abc/xyz.git');
    assert.equal(urls.travis, 'https://travis-ci.org/abc/xyz');
    assert.equal(urls.https, 'https://github.com/abc/xyz');
  });

  it('should expand repository path with branch', function() {
    var urls = repo.expandUrl('abc/xyz#dev');
    assert.equal(urls.host_api, 'api.github.com');
    assert.equal(urls.host_raw, 'https://raw.githubusercontent.com');
    assert.equal(urls.api, 'https://api.github.com/repos/abc/xyz');
    assert.equal(urls.tarball, 'https://api.github.com/repos/abc/xyz/tarball/dev');
    assert.equal(urls.zip, 'https://github.com/abc/xyz/archive/dev.zip');
    assert.equal(urls.clone, 'https://github.com/abc/xyz.git');
    assert.equal(urls.travis, 'https://travis-ci.org/abc/xyz?branch=dev');
    assert.equal(urls.https, 'https://github.com/abc/xyz/blob/dev');
  });

  it('should expand a git+https url', function() {
    var urls = repo.expandUrl('git+https://github.com/abc/xyz.git');
    assert.equal(urls.host_api, 'api.github.com');
    assert.equal(urls.host_raw, 'https://raw.githubusercontent.com');
    assert.equal(urls.api, 'https://api.github.com/repos/abc/xyz');
    assert.equal(urls.tarball, 'https://api.github.com/repos/abc/xyz/tarball/master');
    assert.equal(urls.zip, 'https://github.com/abc/xyz/archive/master.zip');
    assert.equal(urls.clone, 'https://github.com/abc/xyz.git');
    assert.equal(urls.travis, 'https://travis-ci.org/abc/xyz');
    assert.equal(urls.https, 'git+https://github.com/abc/xyz');
  });

  it('should expand a git:// url', function() {
    var urls = repo.expandUrl('git://github.com/abc/xyz.git');
    assert.equal(urls.host_api, 'api.github.com');
    assert.equal(urls.host_raw, 'https://raw.githubusercontent.com');
    assert.equal(urls.api, 'https://api.github.com/repos/abc/xyz');
    assert.equal(urls.tarball, 'https://api.github.com/repos/abc/xyz/tarball/master');
    assert.equal(urls.zip, 'https://github.com/abc/xyz/archive/master.zip');
    assert.equal(urls.clone, 'https://github.com/abc/xyz.git');
    assert.equal(urls.travis, 'https://travis-ci.org/abc/xyz');
    assert.equal(urls.https, 'git://github.com/abc/xyz');
  });

  it('should support branches', function() {
    var urls = repo.expandUrl('git://github.com/abc/xyz.git');
    assert.equal(urls.host_api, 'api.github.com');
    assert.equal(urls.host_raw, 'https://raw.githubusercontent.com');
    assert.equal(urls.api, 'https://api.github.com/repos/abc/xyz');
    assert.equal(urls.tarball, 'https://api.github.com/repos/abc/xyz/tarball/master');
    assert.equal(urls.zip, 'https://github.com/abc/xyz/archive/master.zip');
    assert.equal(urls.clone, 'https://github.com/abc/xyz.git');
    assert.equal(urls.travis, 'https://travis-ci.org/abc/xyz');
    assert.equal(urls.https, 'git://github.com/abc/xyz');
  });
});
