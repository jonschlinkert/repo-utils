'use strict';

require('mocha');
var assert = require('assert');
var repo = require('../');

describe('.repository', function() {
  it('should create a repository from a string', function() {
    assert.equal(repo.repository('abc', 'xyz'), 'abc/xyz');
    assert.equal(repo.repository('abc/xyz'), 'abc/xyz');
  });

  it('should create a repository from an object', function() {
    assert.equal(repo.repository({owner: 'abc', name: 'xyz'}), 'abc/xyz');
    assert.equal(repo.repository({repository: 'abc/xyz'}), 'abc/xyz');
    assert.equal(repo.repository({repository: 'abc'}), 'abc');
    assert.equal(repo.repository({pathname: 'abc/xyz'}), 'abc/xyz');
    assert.equal(repo.repository({pathname: 'abc'}), 'abc');
  });

  it('should create a repository from a full url', function() {
    assert.equal(repo.repository('https://github.com/abc/xyz'), 'abc/xyz');
  });

  it('should throw an error when owner is not passed', function(cb) {
    try {
      repo.repository();
      cb(new Error('expected an error'));
    } catch (err) {
      assert.equal(err.message, 'expected owner to be a string');
      cb();
    }
  });
});
