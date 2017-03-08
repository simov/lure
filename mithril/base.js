
module.exports = (m, meta, static, config) =>
  m('html',
    m('head',
      meta.map((attrs, index) =>
        m('meta', meta[index])
      ),

      m('title', [config.strings[0], config.team, config.strings[1]].join(' ')),

      m('link', {rel: 'shortcut icon', href: static.favicon}),

      static.css.map((path) =>
        m('link', {rel: 'stylesheet', type: 'text/css', href: path})
      ),

      static.js.map((path) =>
        m('script', {type: 'text/javascript', src: path})
      ),

      m('script', {type: 'text/javascript'},
        'var config = ' + JSON.stringify(config)
      )
    ),
    m('body', m('#form'))
  )
