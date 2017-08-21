
var path = require('path')
var express = require('express')
var parser = require('body-parser')
var static = require('serve-static')

var mw = require('../lib/mw')
var render = require('../lib/render')


module.exports = (config) => {

  var server = express()

  // static files
  server.use('/dist', static(path.resolve(__dirname, '../dist/')))
  Object.keys(config).forEach((key) => {
    if (config[key].static && config[key].static.root) {
      server.use('/assets', static(config[key].static.root))
    }
  })

  // api
  server.use(parser.json())
  server.use('/api', mw(config))

  // index.html for each config key
  var keys = new RegExp('/(' + Object.keys(config).join('|') + ')', 'i')

  server.use(keys, (req, res) => {
    var key = req.params[0]
    config[key].key = key

    render(config[key]).then((html) => {
      res.writeHead(200, {'content-type': 'text/html'})
      res.end(html)
    })
  })

  // index.html for the first config key
  server.use((req, res) => {
    var key = Object.keys(config)[0]
    config[key].key = key

    render(config[key]).then((html) => {
      res.writeHead(200, {'content-type': 'text/html'})
      res.end(html)
    })
  })

  return server
}
