
var fs = require('fs')
var path = require('path')
var babel = require('babel-core')
var csso = require('csso')
var uglify = require('uglify-js')

var render = require('./render')


var js = {
  transpile: () => {
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
  },

  minify: (code) => {
    var options = {
      compress: {},
      mangle: true
    }

    var minified = uglify.minify(code, options).code

    return minified
  }
}


var css = {
  minify: () => {
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


module.exports = (location, config) => {

  Object.keys(config).forEach(async (key) => {
    var dpath = path.resolve(location, key)

    var write = (file, data) => {
      fs.writeFileSync(path.resolve(dpath, file), data, 'utf8')
    }

    if (!fs.existsSync(dpath)) {
      fs.mkdirSync(dpath)
    }

    config[key].key = key

    var html = await render(config[key])

    write('lure.min.css', css.minify())
    write('lure.min.js', mithril + '\n' + js.minify(js.transpile()))
    write('index.html', html)
  })
}
