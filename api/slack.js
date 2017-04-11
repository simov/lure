
var request = require('@request/client')
var purest = require('purest')({request, promise: Promise})
var slack = purest({provider: 'slack', config: require('../config/purest')})


module.exports = (config) => ({

  send: ({key, email}) => Promise.all(
    [key].concat(config[key].invite || [])
      .map((key) => slack
        .post('users.admin.invite')
        .form({token: config[key].token, email})
        .request())),

  users: ({key}) => slack
    .get('users.list')
    .qs({token: config[key].token, presence: true})
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
