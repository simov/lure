
# lure

# config.json

Create `config.json` file with following content:

```json
{
  "development": {
    "my-slack-org": {
      "id": "[slack-org-subdomain]",
      "name": "[Org Name]",
      "token": "[access-token]",
      "invite": [],
      "meta": [],
      "static": {
        "favicon": "",
        "logo": "",
        "css": [],
        "js": []
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
    },
    "my-github-org": {
      "id": "[github-org-account-name]",
      "name": "[Org Name]",
      "token": "[access-token]",
      "invite": [],
      "meta": [],
      "static": {
        "favicon": "",
        "logo": "",
        "css": [],
        "js": []
      },
      "strings": [
        "Join",
        "on GitHub!",
        "active",
        "members",
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

# Scopes

- Slack `admin`
- GitHub `admin:org`

# Build

```bash
lure --config path/to/config.json --build path/to/location/
lure --config path/to/config.json --build path/to/location/ --env production
```

# Serve

```bash
lure --config path/to/config.json --serve path/to/location/ --key [key-to-serve] --port 3000
```

# API

```js
// TODO
```
