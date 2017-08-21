
var express = require('express')
var api = require('../api/')


module.exports = (config) => {
  var invite = api(config)
  var mw = express()

  mw.post('/send', (req, res) => {
    var provider = config[req.body.key].provider

    invite[provider].send(req.body)
      .then((results) => res.json(results[0][1]))
      .catch((err) => res.json({error: err.message}))
  })

  mw.get('/users', (req, res) => {
    var provider = config[req.query.key].provider

    invite[provider].users(req.query)
      .then((result) => res.json(result))
      .catch((err) => res.json({error: err.message}))
  })

  return mw
}
