const semver = require('semver')

console.log(semver.valid('1.2.3')) // '1.2.3'
console.log(semver.satisfies('1.1.3-beta.1', '^1.1.0'))