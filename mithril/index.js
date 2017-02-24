
window.addEventListener('DOMContentLoaded', () => {
  m.mount(document.querySelector('#form'), {
    oninit: (vnode) => {
      vnode.state = {
        active: 0,
        total: 0,
        status: {invite: true},
        send: (e) => send(e.target.previousSibling.value)
      }

      function status (key, value) {
        vnode.state.status.invite = false
        vnode.state.status.wait = false
        vnode.state.status.ok = false
        vnode.state.status.error = false
        vnode.state.status[key] = (key === 'error' ? value : true)
      }

      function send (email) {
        if (
          !email ||
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
        ) return

        status('wait')

        m.request({
          method: 'POST',
          url: '/invite/send',
          data: {org: document.querySelector('[type=hidden').value, email}
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
        data: {org: document.querySelector('[type=hidden').value}
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
