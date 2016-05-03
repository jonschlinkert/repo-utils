'use strict';

require('mocha');
var assert = require('assert');
var repo = require('../');

var str = {author: 'Brian Woodward (https://github.com/doowb)'};
var obj = {author: { name: 'Brian Woodward', url: 'https://github.com/doowb' }};

describe('.author', function() {
  it('should get an author object from an author string', function() {
    assert.deepEqual(repo.author(str), obj.author);
  });

  it('should get an author object from an author object', function() {
    assert.deepEqual(repo.author(obj), obj.author);
  });
});
