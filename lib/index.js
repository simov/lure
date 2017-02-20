
var fs = require('fs')
var path = require('path')
var request = require('@request/client')
var purest = require('purest')({request, promise: Promise})
var slack = purest({provider: 'slack', config: require('../config/purest')})

var template = fs.readFileSync(
  path.resolve(__dirname, '../mithril/base.html'), 'utf8')


module.exports = (config) => ({

  send: ({email}) => ((
    send = (config) => slack
      .post('users.admin.invite')
      .form({token: config.token, email})
      .request()
    ) => (
      config.additional && [].concat(config.additional).forEach(send),
      send(config)
    ))(),

  users: () => slack
    .get('users.list')
    .qs({token: config.token, presence: true})
    .request()
    .then(([res, body]) => ((
      total = body.members
        .filter((user) => !user.is_bot && !user.deleted)
      ) => ({
        total: total.length,
        active: total.filter((user) => user.presence === 'active').length
      })
    )()),

  render: () => template
})
