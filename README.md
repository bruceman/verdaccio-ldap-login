# verdaccio-simpleldap

Verdaccio plugin for simple ldap authenticate

---

## Installation

```
npm install verdaccio-simpleldap
```

## Usage
Config Verdaccio auth section.
- url: the ldap server url
- dn: user name pattern, `{}` will be replaced with user name.

```
auth:
   simpleldap:
     url: ldap://127.0.0.1:389/
     dn: "uid={},ou=people,dc=com"
```


## Development

```
npm run build
```


## Refers
- https://verdaccio.org/docs/en/plugin-auth
- http://ldapjs.org/client.html