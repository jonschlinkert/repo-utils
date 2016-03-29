'use strict';

var utils = require('./');

console.log(utils.username(require('./package')))
// console.log(utils.gitConfig())
console.log(utils.author(require('./package')))
console.log(utils.authorName(require('./package')))
console.log(utils.gitUser())
console.log(utils.gitUserName())
console.log(utils.gitUserEmail())
