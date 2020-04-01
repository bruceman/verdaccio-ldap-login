"use strict";

const ldap = require('ldapjs');
/**
 * Ldap Verdaccio Authenticate Plugin.
 * 
 * @refer http://ldapjs.org/client.html
 */


class AuthLdapPlugin {
  constructor(config, options) {
    this.logger = options.logger;
    this.dn = config.dn || 'uid={},dc=com';
    this.client = ldap.createClient({
      url: config.url
    });
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

    this.client.bind(this.dn.replace('{}', user), password, function (err) {
      if (err) {
        this.logger.info('login failed: ' + err); // fail

        cb(null, false);
      } else {
        // success
        cb(null, [user]);
      }
    });
  }

}

module.exports = (config, options) => {
  return new AuthLdapPlugin(config, options);
};