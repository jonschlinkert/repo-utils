'use strict';

require('mocha');
var assert = require('assert');
var repo = require('../');

describe('.https', function() {
  it('should create a github https url from repository path', function() {
    assert.equal(repo.https('abc/xyz'), 'https://github.com/abc/xyz');
  });

  it('should create a github https url from repository URL', function() {
    assert.equal(repo.https('https://github.com/abc/xyz'), 'https://github.com/abc/xyz');
  });
});

