'use strict';

require('mocha');
var assert = require('assert');
var repo = require('../');

describe('.issues', function() {
  it('should create a github issues url from repository path', function() {
    assert.equal(repo.issues('abc/xyz'), 'https://github.com/abc/xyz/issues');
  });

  it('should create a github issues url from repository URL', function() {
    assert.equal(repo.issues('https://github.com/abc/xyz'), 'https://github.com/abc/xyz/issues');
  });
});
