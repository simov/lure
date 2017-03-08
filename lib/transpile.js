
var fs = require('fs')
var path = require('path')
var babel = require('babel-core')

var files = [
  path.resolve(__dirname, '../mithril/form.js'),
  path.resolve(__dirname, '../mithril/index.js'),
]

var options = {
  presets: ['es2015'],
  comments: false,
  compact: true,
  minified: true
}

var transpile = () => files
  .map((file) => babel.transformFileSync(file, options))
  .reduce((source, {code}) => (source += code || source), '')

module.exports = (location) => {
  var fpath = path.resolve(location, 'slack-invitation.js')

  fs.writeFileSync(fpath, transpile(), 'utf8')
}
