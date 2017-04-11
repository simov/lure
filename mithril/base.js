
module.exports = (m, meta, static, config) =>
  m('html',
    m('head',
      meta.map((attrs, index) =>
        m('meta', meta[index])
      ),

      m('title', [config.strings[0], config.name, config.strings[1]].join(' ')),

      m('link', {rel: 'shortcut icon', href: static.favicon}),

      static.css.map((path) =>
        m('link', {rel: 'stylesheet', type: 'text/css', href: path})
      ),

      m('script', {type: 'text/javascript'},
        'var config = ' + JSON.stringify(config)
      ),

      static.js.map((path) =>
        m('script', {type: 'text/javascript', src: path})
      )
    ),
    m('body', m('#form'))
  )
