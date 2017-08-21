
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
var base = require('../mithril/base')
var meta = require('../config/meta')
var template = require('../config/template')


module.exports = (config) => (
  (static = config.static || template[config.provider].static) =>
  render(
    base({
      m,
      meta: meta.concat(config.meta || []),
      static: {
        favicon: static.favicon,
        css: ['/dist/lure.min.css'].concat(static.css || []),
        js: ['/dist/lure.min.js'].concat(static.js || [])
      },
      config: {
        provider: config.provider,
        id: config.id,
        name: config.name,
        key: config.key,
        logo: static.logo,
        strings: config.strings || template[config.provider].strings
      },
    })
  )
  .then((html) => '<!DOCTYPE html>\n' + html)
)()
