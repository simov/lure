
window.addEventListener('DOMContentLoaded', () => {
  m.mount(document.querySelector('#form'), {
    oninit: (vnode) => {
      vnode.state = {
        active: 0,
        total: 0,
        status: {invite: true},
        send: (e) => {
          // onkeyup
          if (e.type === 'keyup') {
            if (e.keyCode === 13) {
              send(e.target.value)
            }
          }
          // onclick
          else {
            send(e.target.previousSibling.value)
          }
          // onsubmit
          return false
        }
      }

      function status (key, value) {
        vnode.state.status.invite = false
        vnode.state.status.wait = false
        vnode.state.status.ok = false
        vnode.state.status.error = false
        vnode.state.status[key] = (key === 'error' ? value : true)
      }

      function send (input) {
        if (!input) {
          return
        }

        if (
          config.provider === 'slack' &&
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input)) {
          return
        }

        status('wait')

        var data = {key: config.key}
        if (config.provider === 'github') {
          data.user = input
        }
        else if (config.provider === 'slack') {
          data.email = input
        }

        m.request({
          method: 'POST',
          url: '/invite/send',
          data
        })
        .then((res) => (res.error)
          ? status('error', res.error)
          : status('ok')
        )
        .catch((err) => console.log(err))
      }

      m.request({
        method: 'GET',
        url: '/invite/users',
        data: {key: config.key}
      })
      .then((res) => {
        vnode.state.active = res.active
        vnode.state.total = res.total
      })
      .catch((err) => console.log(err))
    },
    view: (vnode) => form(vnode.state)
  })
})
