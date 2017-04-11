
module.exports = (config) => ({
  github: require('./github')(config),
  slack: require('./slack')(config)
})
