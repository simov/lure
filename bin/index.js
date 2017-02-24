#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2))

if (argv.help) {
  console.log('--template path/to/base.js')
  console.log('--location path/to/serve/location/')
  process.exit()
}

if (!argv.template) {
  console.error('Specify --template path/to/base.js')
  process.exit()
}

if (!argv.location) {
  console.error('Specify --location path/to/serve/location/')
  process.exit()
}


var fs = require('fs')
var path = require('path')

var m = require('./mithril')
var render = require('mithril-node-render')

var template = require(path.resolve(process.cwd(), argv.template))

render(template(m)).then((html) => {
  fs.writeFileSync(
    path.resolve(process.cwd(), argv.location + 'index.html'),
    '<!DOCTYPE html>\n' + html,
    'utf8'
  )
})
