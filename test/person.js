'use strict';

require('mocha');
var assert = require('assert');
var repo = require('../');

var str = 'Brian Woodward (https://github.com/doowb)';
var obj = { name: 'Brian Woodward', url: 'https://github.com/doowb' };

describe('.person', function() {
  it('should get an person object from an person string', function() {
    assert.deepEqual(repo.person(str), obj);
  });

  it('should get an person object from an person object', function() {
    assert.deepEqual(repo.person(obj), obj);
  });
});
