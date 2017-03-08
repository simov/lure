
var fs = require('fs')
var path = require('path')
var express = require('express')
var parser = require('body-parser')
var static = require('serve-static')
var api = require('./api')


module.exports = (location, config) => {
  var server = express()
  var invite = api(config)
  var template = fs.readFileSync(path.resolve(location, 'index.html'), 'utf8')
  // currently it can serve only a single organization - the first one
  var prefix = '/' + config[Object.keys(config)[0]].subdomain

  server.use(prefix, static(location))
  server.use(parser.json())

  server.use('/invite', ((api = express()) => {
    api.post('/send', (req, res) => {
      invite.send(req.body)
        .then((results) => res.json(results[0][1]))
        .catch((err) => res.json({error: err.message}))
    })

    api.get('/users', (req, res) => {
      invite.users(req.query)
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
