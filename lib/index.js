
var request = require('@request/client')
var purest = require('purest')({request, promise: Promise})
var slack = purest({provider: 'slack', config: require('../config/purest')})


var m = require('../lib/mithril')
var render = require('mithril-node-render')

var template = require('../mithril/base')


module.exports = (config) => (
  template = config.template ? require(config.template) : template, {

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

  render: () => render(template(m))
})
