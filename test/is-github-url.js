'use strict';

require('mocha');
var url = require('url');
var assert = require('assert');
var repo = require('../');

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
