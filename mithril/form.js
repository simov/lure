
var form = ({active, total, status, send}) =>
  m('.splash',
    m('.holder',
      m('img.logo', {src: '/assets/images/logo.png'}),
      m('p', 'Join ', m('b', '[TeamName]'), ' on Slack'),
      m('p.status', m('b.active', active), ' users online now of ',
        m('b.total', total), ' registered'),
      m('form',
        m('input[type=email] [placeholder=you@yourdomain.com] [autofocus=true]'),
        m('button[type=button]', {
          onclick: send,
          class: status.ok ? 'success' : status.error ? 'error' : null,
          disabled: status.wait || status.ok
        },
          status.invite ? 'Get my Invite'
          : status.wait ? 'Please wait'
          : status.ok ? 'Check your email!'
          : status.error
        )
      ),
      m('p.signin', 'or ',
        m('a[target=_top]', {href: 'https://[TeamSubdomain].slack.com'},
        'sign in'))
    ),
    m('.overlay')
  )
