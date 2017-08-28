
var path = require('path')
var express = require('express')
var parser = require('body-parser')
var static = require('serve-static')

var mw = require('../lib/mw')
var render = require('../lib/render')


module.exports = (config) => {
  var api = mw(config)
  var server = express()

  // static - lure
  Object.keys(config).forEach((key) => {
    var prefix = config[key].path || ''
    server.use(`${prefix}/dist`, static(path.resolve(__dirname, '../dist/')))
  })

  // static - custom
  Object.keys(config).forEach((key) => {
    if (config[key].static && config[key].static.root) {
      var prefix = config[key].path || ''
      server.use(`${prefix}/assets`, static(config[key].static.root))
    }
  })

  // api
  server.use(parser.json())
  Object.keys(config).forEach((key) => {
    var prefix = config[key].path || ''
    server.use(`${prefix}/api`, api)
  })

  // index.html
  Object.keys(config).forEach((key) => {
    var prefix = config[key].path || ''
    server.use(`${prefix}/:key?`, (req, res) => {
      var key = config[req.params.key]
        ? req.params.key
        : Object.keys(config)[0]

      config[key].key = key

      render(config[key]).then((html) => {
        res.writeHead(200, {'content-type': 'text/html'})
        res.end(html)
      })
    })
  })

  return server
}
