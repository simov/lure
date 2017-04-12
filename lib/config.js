
var meta = require('../config/meta')
var template = require('../config/template')


module.exports = (config) => {
  var static = config.static || template[config.provider].static

  return {
    meta: meta.concat(config.meta || []),

    static: {
      favicon: static.favicon,
      css: ['/' + config.key + '/lure.min.css'].concat(static.css || []),
      js: ['/' + config.key + '/lure.min.js'].concat(static.js || [])
    },

    config: {
      provider: config.provider,
      id: config.id,
      name: config.name,
      key: config.key,
      logo: static.logo,
      strings: config.strings || template[config.provider].strings
    }
  }
}
