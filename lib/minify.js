
var fs = require('fs')
var path = require('path')
var minify = {
  js: require('uglify-js').minify,
  css: require('csso').minify
}

var options = {
  js: {
    compress: {},
    mangle: true
  },
  css: {}
}

var assets = {
  mithril: path.resolve(__dirname, '../node_modules/mithril/mithril.min.js'),
  styles: path.resolve(__dirname, '../assets/css/styles.css')
}

module.exports = (location) => {
  var fpath = path.resolve(location, 'slack-invitation.js')

  var source =
    fs.readFileSync(assets.mithril, 'utf8') + '\n' +
    minify.js(fpath, options.js).code

  fs.writeFileSync(fpath.replace(/\.js$/, '.min.js'), source, 'utf8')


  var source =
    minify.css(fs.readFileSync(assets.styles, 'utf8'), options.css).css

  fs.writeFileSync(
    fpath.replace(/\.js$/, '.min.css'), source, 'utf8')
}
