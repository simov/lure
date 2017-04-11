
var fs = require('fs')
var path = require('path')
var express = require('express')
var parser = require('body-parser')
var static = require('serve-static')
var api = require('../api/')


module.exports = (location, config, key) => {
  var server = express()

  var invite = {
    github: api.github(config),
    slack: api.slack(config)
  }

  var template = fs.readFileSync(path.resolve(location, 'index.html'), 'utf8')

  server.use('/' + key, static(location))
  server.use(parser.json())

  server.use('/invite', ((api = express()) => {
    api.post('/send', (req, res) => {
      var provider = config[req.body.key].provider
      invite[provider].send(req.body)
        .then((results) => res.json(results[0][1]))
        .catch((err) => res.json({error: err.message}))
    })

    api.get('/users', (req, res) => {
      var provider = config[req.query.key].provider
      invite[provider].users(req.query)
        .then((result) => res.json(result))
        .catch((err) => res.json({error: err.message}))
    })

    return api
  })())

  server.use((req, res) => {
    res.writeHead(200, {'content-type': 'text/html'})
    res.end(template)
  })

  return server
}
