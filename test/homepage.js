'use strict';

require('mocha');
var url = require('url');
var assert = require('assert');
var repo = require('../');

describe('.homepage', function() {
  it('should create a homepage from a string', function() {
    assert.equal(repo.homepage('abc', 'xyz'), 'https://github.com/abc/xyz');
    assert.equal(repo.homepage('abc/xyz'), 'https://github.com/abc/xyz');
    assert.equal(repo.homepage('abc'), 'https://github.com/abc');
  });

  it('should create a homepage from an object', function() {
    assert.equal(repo.homepage({repository: 'abc/xyz'}), 'https://github.com/abc/xyz');
    assert.equal(repo.homepage({repository: 'abc'}), 'https://github.com/abc');
    assert.equal(repo.homepage({pathname: 'abc/xyz'}), 'https://github.com/abc/xyz');
    assert.equal(repo.homepage({pathname: 'abc'}), 'https://github.com/abc');
  });

  it('should create a homepage url from a `url.parse` object', function() {
    assert.equal(repo.homepage(url.parse('https://github.com/abc/xyz')), 'https://github.com/abc/xyz');
    assert.equal(repo.homepage(url.parse('git://github.com/abc/xyz')), 'git://github.com/abc/xyz');
  });

  it('should use the protocol passed on the options', function() {
    assert.equal(repo.homepage(url.parse('git://github.com/abc/xyz'), {protocol: 'https:'}), 'https://github.com/abc/xyz');
  });

  it('should create a homepage from a string and options object', function() {
    assert.equal(repo.homepage('abc/xyz', {hostname: 'foo.com'}), 'https://foo.com/abc/xyz');
  });

  it('should create a homepage from a full url', function() {
    assert.equal(repo.homepage('https://github.com/abc/xyz'), 'https://github.com/abc/xyz');
  });

  it('should throw an error when incorrect args are passed', function(cb) {
    try {
      repo.homepage();
      cb(new Error('expected an error'));
    } catch (err) {
      assert.equal(err.message, 'expected a repository string in the form of "owner/repo"');
      cb();
    }
  });
});

