const ldap = require('ldapjs');

/**
 * Ldap Verdaccio Authenticate Plugin.
 * 
 * @refer http://ldapjs.org/client.html
 */
class AuthLdapPlugin {
    constructor(config, options) {
      this.users = {};
      this.url = config.url || 'ldap://127.0.0.1:1389';
      this.dn = config.dn || 'uid={},dc=com';
    }
  
    /**
     * Authenticate an user.
     * 
     * @param user user to login
     * @param password provided password
     * @param cb callback function
     */
    authenticate(user, password, cb) {
      if (!user || !password) {
        // jsut fail directly
        cb(null, false);
      }

      // already login
      if (this.users[user] === password){
        cb(null, [user]);
        return;
      }
  
      const client = ldap.createClient({url: this.url});
      // try login from ldap
      client.bind(this.dn.replace('{}', user), password, (err) => {
        if (err) {
          console.log(`[${user}] login failed: ${err}`);
          // fail
          cb(null, false);
        } else {
          // success
          this.users[user] = password;
          cb(null, [user]);
        }
      });
    }

    /**
     * don't allow add user directly
     */
    adduser(user, password, cb) {
      cb(null, false);
    }

    /**
     * don't allow change password
     */
    changePassword(user, password, newPassword, cb) {
      cb(null, false);
    }
  }
  
  module.exports = (config, options) => {
    return new AuthLdapPlugin(config, options);
  };
  