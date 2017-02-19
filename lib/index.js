
var fs = require('fs')
var path = require('path')
var request = require('@request/client')

var template = fs.readFileSync(
  path.resolve(__dirname, '../mithril/base.html'), 'utf8')


module.exports = (config) => ({
  send: ({email}) => Promise.all(
    [].concat(config).map((config) => new Promise((resolve, reject) => {
      request({
        method: 'POST',
        url: `https://${config.organization}.slack.com/api/users.admin.invite`,
        form: {
          token: config.token,
          email
        },
        parse: {json: true},
        callback: (err, res, body) => err ? reject(err) : resolve([res, body])
      })
    }))
  ),

  render: () => template
})
