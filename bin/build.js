#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2))

var fs = require('fs')
var path = require('path')
var build = require('../lib/build')


var dpath = path.resolve(__dirname, '../dist/')

if (!fs.existsSync(dpath)) {
  fs.mkdirSync(dpath)
}

fs.writeFileSync(path.resolve(dpath, 'lure.min.css'), build.css(), 'utf8')
fs.writeFileSync(path.resolve(dpath, 'lure.min.js'), build.js(), 'utf8')
