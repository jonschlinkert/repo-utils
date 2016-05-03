'use strict';

require('mocha');
var assert = require('assert');
var repo = require('../');

describe('.file', function() {
  it('should create a github file url from repository path', function() {
    assert.equal(repo.file('abc/xyz', 'README.md'), 'https://github.com/abc/xyz/blob/master/README.md');
  });

  it('should create a github file url from repository URL', function() {
    assert.equal(repo.file('https://github.com/abc/xyz', 'LICENSE'), 'https://github.com/abc/xyz/blob/master/LICENSE');
  });
});
