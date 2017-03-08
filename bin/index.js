#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2))

if (argv.help) {
  console.log('--config path/to/config.json')
  console.log('--build path/to/build/location/')
  console.log('--serve path/to/serve/location/')
  console.log('--port number')
  console.log('--env environment')
  process.exit()
}

if (!argv.config) {
  console.log('Specify --config path/to/config.json')
  process.exit()
}

var env = process.env.NODE_ENV || argv.env || 'development'

var fs = require('fs')
var path = require('path')
var transpile = require('../lib/transpile')
var minify = require('../lib/minify')
var render = require('../lib/render')

if (argv.build) {
  var config = require(path.resolve(process.cwd(), argv.config))[env]
  var location = path.resolve(process.cwd(), argv.build)

  Object.keys(config).forEach((subdomain) => {
    var dpath = path.resolve(location, subdomain)

    if (!fs.existsSync(dpath)) {
      fs.mkdirSync(dpath)
    }

    transpile(dpath)
    minify(dpath)
    render(dpath, config[subdomain])
  })
}

if (argv.serve && !argv.port) {
  console.log('Specify --port number')
  process.exit()
}

if (argv.port && !argv.serve) {
  console.log('Specify --serve path/to/serve/location/')
  process.exit()
}

if (argv.serve && argv.port) {
  var config = require(path.resolve(process.cwd(), argv.config))[env]
  var location = path.resolve(process.cwd(), argv.serve)
  var server = require('../server/')(location, config)
  server.listen(argv.port, () => console.log('Oh Hi', argv.port, '!'))
}
