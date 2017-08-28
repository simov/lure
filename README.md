
# lure

```bash
npm i -g lure
lure --config /path/to/config.json --port 3000 --env production
```

# config.json

```json
{
  "development": {
    "my-org": {
      "provider": "slack or github",
      "id": "[slack org subdomain or github org id]",
      "name": "[readable name of your org]",
      "token": "[OAuth access token]",
      "path": "[path prefix for all routes]",
      "invite": ["additional config keys to invite"],
      "meta": ["additional meta tags to embed"],
      "static": {
        "root": "/absolute/path/to/assets",
        "favicon": "/assets/favicon.ico",
        "logo": "/assets/logo.png",
        "css": ["/assets/custom.css"],
        "js": ["/assets/custom.js"]
      },
      "strings": [
        "Join",
        "on Slack!",
        "users online now of",
        "registered",
        "Get my Invite",
        "Please wait",
        "Check your email!",
        "or",
        "sign in"
      ]
    }
  }
}
```

---

# Serve Multiple Invitation Screens

```json
{
  "development": {
    "my-slack-org": {},
    "my-other-slack-org": {},
    "my-github-org": {}
  }
}
```

- `http://localhost:3000` serves _my-slack-org_
- `http://localhost:3000/my-slack-org` serves _my-slack-org_
- `http://localhost:3000/my-other-slack-org` serves _my-other-slack-org_
- `http://localhost:3000/my-github-org` serves _my-github-org_

---

# Organization

## Slack

- Organization: `https://varnalab.slack.com`
- OAuth Scope: `admin`

```json
{
  "provider": "slack",
  "id": "varnalab",
  "name": "VarnaLab",
  "token": "[ACCESS_TOKEN]",
}
```

## GitHub

- Organization: `https://github.com/varnalab`
- OAuth Scope: `admin:org`

```json
{
  "provider": "github",
  "id": "varnalab",
  "name": "VarnaLab",
  "token": "[ACCESS_TOKEN]",
}
```

---

# Send Multiple Invitations

Invitation sent from `my-slack-org` will result in sending an invitation to **both** `my-slack-org` and `my-other-slack-org`:

```json
{
  "development": {
    "my-slack-org": {
      "invite": ["my-other-slack-org"]
    },
    "my-other-slack-org": {}
  }
}
```

---

# Additional Meta Tags

```json
{
  "meta": [
    {"name": "author", "content": "Simeon Velichkov"}
  ]
}
```

```html
<meta name="author" content="Simeon Velichkov">
```

---

# Additional Static Files

The `/assets` prefix is **required**!

```json
{
  "static": {
    "root": "/absolute/path/to/assets",
    "favicon": "/assets/favicon.ico",
    "logo": "/assets/logo.png",
    "css": [
      "/assets/custom.css"
    ],
    "js": [
      "/assets/custom.js"
    ]
  }
}
```

---

# Path Prefix

Prefix all invitation routes:

```json
{
  "path": "/invite"
}
```

---

# Localization

```json
{
  "strings": [
    "Присъедини се към чат канала на",
    "в Slack!",
    "потребители са активни в момента от",
    "регистрирани",
    "Вземи своята покана сега!",
    "Поканата се изпраща",
    "Провери пощата си!",
    "или",
    "се логни"
  ]
}
```
