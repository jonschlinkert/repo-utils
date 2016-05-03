'use strict';

require('mocha');
var url = require('url');
var assert = require('assert');
var repo = require('../');

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
