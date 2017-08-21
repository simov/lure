
var fs = require('fs')
var path = require('path')
var babel = require('babel-core')
var csso = require('csso')
var uglify = require('uglify-js')


var transpile = {
  js: () => {
    var options = {
      presets: ['es2015']
    }

    var transpiled =
      ['form', 'index']
        .reduce((str, file) =>
          str +=
            babel.transformFileSync(
              path.resolve(__dirname, `../mithril/${file}.js`),
              options
            ).code
            + '\n',
          ''
        )

    return transpiled
  }
}

var minify = {
  js: (code) => {
    var options = {
      compress: {},
      mangle: true
    }

    var minified = uglify.minify(code, options).code

    return minified
  },

  css: () => {
    var fpath = path.resolve(__dirname, '../config/lure.css')
    var code = fs.readFileSync(fpath, 'utf8')
    var minified = csso.minify(code).css
    return minified
  }
}

var mithril = (() => {
  require('mithril/package.json')
  var fpath = Object.keys(require.cache)
    .find((fpath) => /mithril\/package\.json$/.test(fpath))

  return fs.readFileSync(
    path.join(path.dirname(fpath), 'mithril.min.js'), 'utf8')
})()

module.exports = {
  js: () => mithril + '\n' + minify.js(transpile.js()),
  css: () => minify.css(),
  transpile,
  minify,
  mithril
}
