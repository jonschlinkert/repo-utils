'use strict';

require('mocha');
var assert = require('assert');
var repo = require('../');

describe('.parse', function() {
  it('should parse a git remote url', function() {
    var urls = repo.parseUrl('https://github.com/abc/xyz.git');
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
    var urls = repo.parseUrl('https://github.com/abc/xyz');
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
    var urls = repo.parseUrl('https://foo.com/abc/xyz');
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
    var urls = repo.parseUrl('https://raw.githubusercontent.com/foo/bar/master/README.md');
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
    var urls = repo.parseUrl('abc/xyz');
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
      repo.parseUrl();
      cb(new Error('expected an error'));
    } catch (err) {
      assert.equal(err.message, 'expected repository URL to be a string');
      cb();
    }
  });
});
