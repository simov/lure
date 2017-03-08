
var form = ({active, total, status, send}) =>
  m('.splash',
    m('.holder',
      m('img.logo', {src: config.logo}),
      m('p', config.strings[0], ' ', m('b', config.team), ' ', config.strings[1]),
      m('p.status', m('b.active', active), ' ', config.strings[2], ' ',
        m('b.total', total), ' ', config.strings[3]),
      m('form',
        m('input[type=email] [placeholder=you@yourdomain.com] [autofocus=true]'),
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
      m('p.signin',
        config.strings[7],
        ' ',
        m('a[target=_button]',
          {href: 'https://' + config.subdomain + '.slack.com'},
          config.strings[8]
        )
      )
    ),
    m('.overlay')
  )
