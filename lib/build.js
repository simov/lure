
var fs = require('fs')
var path = require('path')
var render = require('./render')

var css = fs.readFileSync(
  path.resolve(__dirname, '../dist/lure.min.css'), 'utf8')

var js = fs.readFileSync(
  path.resolve(__dirname, '../dist/lure.min.js'), 'utf8')

var mithril = (() => {
  require('mithril/package.json')
  var fpath = Object.keys(require.cache)
    .find((fpath) => /mithril\/package\.json$/.test(fpath))

  return fs.readFileSync(
    path.join(path.dirname(fpath), 'mithril.min.js'), 'utf8')
})()


module.exports = (location, config) => {

  Object.keys(config).forEach((key) => {
    var dpath = path.resolve(location, key)

    if (!fs.existsSync(dpath)) {
      fs.mkdirSync(dpath)
    }

    config[key].key = key

    render(config[key])
      .then((html) => {
        fs.writeFileSync(path.resolve(dpath, 'index.html'), html, 'utf8')
        fs.writeFileSync(path.resolve(dpath, 'lure.min.css'), css, 'utf8')
        fs.writeFileSync(path.resolve(dpath, 'lure.min.js'),
          mithril + '\n' + js, 'utf8')
      })
      .catch((err) => console.error(err))
  })
}
