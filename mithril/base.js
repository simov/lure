
module.exports = (m) =>
  m('html',
    m('head',
      m('title', 'Join [TeamName] on Slack!'),
      m('meta [charset=utf-8]'),
      m('meta [name=viewport] [content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"]'),
      m('link [rel="shortcut icon"]', {href: '/assets/images/favicon.ico'}),
      m('link [rel="stylesheet"] [type="text/css"]', {href: '/assets/css/styles.css'}),

      m('script [type="text/javascript"]', {src: 'https://cdnjs.cloudflare.com/ajax/libs/mithril/1.0.1/mithril.min.js'}),
      m('script [type="text/javascript"]', {src: '/mithril/form.js'}),
      m('script [type="text/javascript"]', {src: '/mithril/index.js'})
    ),
    m('body', m('#form'), m('input[type=hidden] [value=[TeamConfigKey]]'))
  )
