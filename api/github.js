
var request = require('@request/client')
var purest = require('purest')({request, promise: Promise})
var github = purest({provider: 'github', config: require('../config/purest')})


module.exports = (config) => ({

  send: ({key, user}) => Promise.all(
    [key].concat(config[key].invite || [])
      .map((key) => github
        .put('orgs/' + config[key].id + '/memberships/' + user)
        .headers({'user-agent': 'github-invitation'})
        .auth(config[key].token)
        .request())),

  users: ({key}) => github
    .get('orgs/' + config[key].id + '/members')
    .headers({'user-agent': 'github-invitation'})
    .auth(config[key].token)
    .request()
    .then(([res, body]) => ({active: body.length}))
})
