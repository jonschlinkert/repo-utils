'use strict';

require('mocha');
var assert = require('assert');
var repo = require('../');

var str = {author: 'Brian Woodward (https://github.com/doowb)'};
var obj = {author: { name: 'Brian Woodward', url: 'https://github.com/doowb' }};
var pkg = {
  author: 'Brian Woodward (https://github.com/doowb)',
  repository: 'foo/bar'
};

describe('.username', function() {
  it('should get a username from a string', function() {
    assert.equal(repo.username(str), 'doowb');
  });

  it('should get a username from an object', function() {
    assert.equal(repo.username(obj), 'doowb');
  });

  it('should get a username from a package.json object', function() {
    assert.equal(repo.username(pkg), 'doowb');
  });
});
