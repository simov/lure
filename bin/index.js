#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2))

if (argv.help) {
  console.log('--config path/to/config.json')
  console.log('--build path/to/build/location/')
  console.log('--serve path/to/serve/location/')
  console.log('--key config-key-to-serve')
  console.log('--port number')
  console.log('--env environment')
  process.exit()
}

if (!argv.config) {
  console.log('Specify --config path/to/config.json')
  process.exit()
}

var path = require('path')
var build = require('../lib/build')

var env = process.env.NODE_ENV || argv.env || 'development'
var config = require(path.resolve(process.cwd(), argv.config))[env]

if (argv.build) {
  var location = path.resolve(process.cwd(), argv.build)

  build(location, config)
}

else if (argv.serve) {
  if (!argv.key) {
    console.log('Specify --key config-key-to-serve')
    process.exit()
  }

  if (!argv.port) {
    console.log('Specify --port number')
    process.exit()
  }

  var location = path.resolve(process.cwd(), argv.serve, argv.key)
  var server = require('../server/')(location, config, argv.key)

  server.listen(argv.port, () => console.log('Oh Hi', argv.port, '!'))
}

else {
  console.log('Specify --build path/to/build/location/')
  console.log('or')
  console.log('Specify --serve path/to/serve/location/')
}
