/*!
 * repo-utils <https://github.com/jonschlinkert/repo-utils>
 *
 * Copyright (c) 2015 Jon Schlinkert
 * Released under the MIT License
 */

'use strict';

var should = require('should');
var repo = require('./');

describe('.url()', function () {
  it('should create a URL from a string', function () {
    repo.url('abc/xyz').should.equal('https://github.com/abc/xyz');
    repo.url('abc').should.equal('https://github.com/abc');
  });

  it('should create a URL from an object:', function () {
    repo.url({pathname: 'abc/xyz'}).should.equal('https://github.com/abc/xyz');
    repo.url({pathname: 'abc'}).should.equal('https://github.com/abc');
  });

  it('should create a URL from a string and options object:', function () {
    repo.url('abc/xyz', {hostname: 'foo.com'}).should.equal('https://foo.com/abc/xyz');
  });

  it('should throw an error when incorrect args are passed:', function () {
    (function () {
      repo.url();
    }).should.throw('[repo-utils#url] expects a string or object.');
  });
});

describe('.git()', function () {
  it('should create a URL from a string', function () {
    repo.git('abc/xyz').should.equal('https://github.com/abc/xyz.git');
    repo.git('abc').should.equal('https://github.com/abc.git');
  });

  it('should create a URL from an object:', function () {
    repo.git({pathname: 'abc/xyz'}).should.equal('https://github.com/abc/xyz.git');
    repo.git({pathname: 'abc'}).should.equal('https://github.com/abc.git');
  });

  it('should create a URL from a string and options object:', function () {
    repo.git('abc/xyz', {hostname: 'foo.com'}).should.equal('https://foo.com/abc/xyz.git');
  });

  it('should throw an error when incorrect args are passed:', function () {
    (function () {
      repo.git();
    }).should.throw('[repo-utils#git] expects a string or object.');
  });
});

describe('.github()', function () {
  it('should create a URL from a string', function () {
    repo.github('abc', 'xyz').should.equal('https://github.com/abc/xyz');
    repo.github('abc/xyz').should.equal('https://github.com/abc/xyz');
    repo.github('abc').should.equal('https://github.com/abc');
  });

  it('should create a URL from an object:', function () {
    repo.github({pathname: 'abc/xyz'}).should.equal('https://github.com/abc/xyz');
    repo.github({pathname: 'abc'}).should.equal('https://github.com/abc');
  });

  it('should create a URL from a string and options object:', function () {
    repo.github('abc/xyz', {hostname: 'foo.com'}).should.equal('https://foo.com/abc/xyz');
  });

  it('should throw an error when incorrect args are passed:', function () {
    (function () {
      repo.github();
    }).should.throw('[repo-utils#github] expects a string or object.');
  });
});

