'use strict';

require('mocha');
var assert = require('assert');
var repo = require('../');

describe('.owner', function() {
  it('should get owner from a string', function() {
    assert.deepEqual(repo.owner('https://github.com/doowb'), 'doowb');
    assert.deepEqual(repo.owner('https://github.com/doowb/foo'), 'doowb');
  });

  it('should get owner from an object with url', function() {
    assert.deepEqual(repo.owner({ name: 'Brian Woodward', url: 'https://github.com/doowb' }), 'doowb');
  });

  it('should get owner from a package.json object with repository string', function() {
    var actual = repo.owner({
      author: 'Brian Woodward (https://github.com/doowb)',
      repository: 'foo/bar'
    });
    assert.deepEqual(actual, 'foo');
  });

  it('should get owner from a package.json object with author', function() {
    var actual = repo.owner({
      author: 'Brian Woodward (https://github.com/doowb)'
    });
    assert.deepEqual(actual, 'doowb');
  });

  it('should get owner from a package.json object with repository object', function() {
    var actual = repo.owner({repository: {url: 'git://github.com/foo/bar.git'}});
    assert.deepEqual(actual, 'foo');
  });
});
