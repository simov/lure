#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2))

if (argv.help) {
  console.log('--config /path/to/config.json')
  console.log('--port number')
  console.log('--env environment')
  process.exit()
}

if (!argv.config) {
  console.log('Specify --config /path/to/config.json')
  process.exit()
}
if (!argv.port) {
  console.log('Specify --port number')
  process.exit()
}

var path = require('path')

var env = process.env.NODE_ENV || argv.env || 'development'
var config = require(path.resolve(process.cwd(), argv.config))[env]

var server = require('../lib/server')(config)
server.listen(argv.port, () => console.log('Oh Hi', argv.port, '!'))
