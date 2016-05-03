'use strict';

require('mocha');
var assert = require('assert');
var repo = require('../');

describe('.bugs', function() {
  it('should create a github bugs url from repository path', function() {
    assert.equal(repo.bugs('abc/xyz'), 'https://github.com/abc/xyz/issues');
  });

  it('should create a github bugs url from repository URL', function() {
    assert.equal(repo.bugs('https://github.com/abc/xyz'), 'https://github.com/abc/xyz/issues');
  });
});
