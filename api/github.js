
var request = require('@request/client')
var purest = require('purest')({request, promise: Promise})
var github = purest({provider: 'github', config: require('../config/purest')})


module.exports = (config) => ({

  send: ({key, user}) => Promise.all(
    [key].concat(config[key].invite || [])
      .map((key) => github
        .put('orgs/' + config[key].id + '/memberships/' + user)
        .headers({'user-agent': 'lure'})
        .auth(config[key].token)
        .request())),

  users: ({key}) => new Promise((resolve, reject) => {
    var active = 0
    ;(function get (page) {
      github
        .get('orgs/' + config[key].id + '/members')
        .qs({page})
        .headers({'user-agent': 'lure'})
        .auth(config[key].token)
        .request()
        .then(([res, body]) => {
          active += body.length
          ;(!body.length || body.length < 30)
            ? resolve({active})
            : get(++page)
        })
        .catch(reject)
    })(1)
  })
})
