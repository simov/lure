
var fs = require('fs')
var path = require('path')
var build = require('./build')
var render = require('./render')


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

    write('lure.min.css', build.css())
    write('lure.min.js', build.js())
    write('index.html', await render(config[key]))
  })
}
