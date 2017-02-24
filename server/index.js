
var request = require('@request/client')
var purest = require('purest')({request, promise: Promise})
var slack = purest({provider: 'slack', config: require('../config/purest')})


module.exports = (config) => ({

  send: ({org, email}) => Promise.all(
    [org].concat(config[org].invite || [])
      .map((org) => slack
        .post('users.admin.invite')
        .form({token: config[org].token, email})
        .request())),

  users: ({org}) => slack
    .get('users.list')
    .qs({token: config[org].token, presence: true})
    .request()
    .then(([res, body]) => ((
      total = body.members
        .filter((user) => !user.is_bot && !user.deleted)
      ) => ({
        total: total.length,
        active: total.filter((user) => user.presence === 'active').length
      })
    )())
})
