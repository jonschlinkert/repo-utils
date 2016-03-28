'use strict';

var gulp = require('gulp');
var keys = require('glob-keys');
var mocha = require('gulp-mocha');
var unused = require('gulp-unused');
var istanbul = require('gulp-istanbul');
var eslint = require('gulp-eslint');

var lint = ['index.js', 'lib/*.js'];

gulp.task('coverage', function() {
  return gulp.src(lint)
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['coverage'], function() {
  return gulp.src('test.js')
    .pipe(mocha({reporter: 'spec'}))
    .pipe(istanbul.writeReports())
    .pipe(istanbul.writeReports({
      reporters: [ 'text', 'text-summary' ],
      reportOpts: {dir: 'coverage', file: 'summary.txt'}
    }))
});

gulp.task('lint', function() {
  return gulp.src(lint.concat(['test/*.js', 'gulpfile.js']))
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('unused', function() {
  return gulp.src(['index.js', 'lib/utils.js'])
    .pipe(unused({keys: keys('lib/utils.js')}));
});

gulp.task('default', ['test', 'lint']);
