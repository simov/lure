
var ui = {
  github: {
    input: 'text',
    placeholder: 'username',
    url: 'https://github.com/' + config.id
  },
  slack: {
    input: 'email',
    placeholder: 'you@yourdomain.com',
    url: 'https://' + config.id + '.slack.com'
  }
}

var form = ({active, total, status, send}) =>
  m('.splash',
    m('.holder',
      // logo
      m('img.logo', {src: config.logo}),

      // title
      m('p', config.strings[0], ' ', m('b', config.name), ' ', config.strings[1]),

      // status
      m('p.status',
        m('b.active', active), ' ', config.strings[2], ' ',
        m('b.total', total), ' ', config.strings[3]),

      // form
      m('form', {onsubmit: send},
        m('input[autofocus=true]', {
          type: ui[config.provider].input,
          placeholder: ui[config.provider].placeholder,
          onkeyup: send}),
        m('button[type=button]', {
          onclick: send,
          class: status.ok ? 'success' : status.error ? 'error' : null,
          disabled: status.wait || status.ok
        },
          status.invite ? config.strings[4]
          : status.wait ? config.strings[5]
          : status.ok ? config.strings[6]
          : status.error
        )
      ),

      // footer
      m('p.signin',
        config.strings[7],
        ' ',
        m('a[target=_button]', {href: ui[config.provider].url},
          config.strings[8]
        )
      )
    ),
    m('.overlay')
  )
