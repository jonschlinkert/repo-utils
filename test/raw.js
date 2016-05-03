'use strict';

require('mocha');
var assert = require('assert');
var repo = require('../');

describe('.raw', function() {
  it('should create a github raw url from repository path', function() {
    assert.equal(repo.raw('abc/xyz', 'README.md'), 'https://raw.githubusercontent.com/abc/xyz/master/README.md');
  });

  it('should create a github raw url from repository URL', function() {
    assert.equal(repo.raw('https://github.com/abc/xyz', 'LICENSE'), 'https://raw.githubusercontent.com/abc/xyz/master/LICENSE');
  });
});
