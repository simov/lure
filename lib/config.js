
var meta = require('../config/meta')
var template = require('../config/template')


module.exports = (config) => ((static = config.static || template.static) => ({
  meta: meta.concat(config.meta || []),
  static: {
    favicon: static.favicon,
    css: (static.css || []).concat('/slack-invitation.min.css'),
    js: (static.js || []).concat('/slack-invitation.min.js')
  },
  config: {
    team: config.team,
    subdomain: config.subdomain,
    logo: static.logo,
    strings: config.strings || template.strings
  }
}))()
