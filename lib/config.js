
var meta = require('../config/meta')
var template = require('../config/template')


module.exports = (config) => ((static = config.static || template.static) => ({
  meta: meta.concat(config.meta || []),
  static: {
    favicon: static.favicon,
    css: [`/${config.subdomain}/slack-invitation.min.css`]
      .concat(static.css || []),
    js: [`/${config.subdomain}/slack-invitation.min.js`]
      .concat(static.js || [])
  },
  config: {
    team: config.team,
    subdomain: config.subdomain,
    logo: static.logo,
    strings: config.strings || template.strings
  }
}))()
