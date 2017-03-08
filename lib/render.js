
var m = (() => {
  // https://github.com/lhorie/mithril.js/issues/1279#issuecomment-278561782

  var m

  // Polyfill DOM env for mithril
  global.window = require('mithril/test-utils/browserMock.js')()
  global.document = window.document

  // Require the lib AFTER THE POLYFILL IS UP
  m = require('mithril')

  // Make available globally for client scripts running on the server
  global.m = m

  // Export for normal server usage
  return m
})()

var fs = require('fs')
var path = require('path')
var render = require('mithril-node-render')
var template = require('../mithril/base')
var _config = require('../lib/config')


module.exports = (location, cfg) => {
  var {meta, static, config} = _config(cfg)

  render(template(m, meta, static, config))
    .then((html) => {
      fs.writeFileSync(
        path.resolve(location, 'index.html'),
        '<!DOCTYPE html>\n' + html,
        'utf8'
      )
    })
    .catch((err) => console.error(err))
}
