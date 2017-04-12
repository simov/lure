
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

var render = require('mithril-node-render')
var template = require('../mithril/base')
var prepare = require('../lib/config')


module.exports = (cfg) => {
  var {meta, static, config} = prepare(cfg)

  return render(template(m, meta, static, config))
    .then((html) => '<!DOCTYPE html>\n' + html)
}
