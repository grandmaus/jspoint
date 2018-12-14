/**
 * Authentication credentials manager
 * @class CredentialsManager
 */
class CredentialsManager {
  /**
   * Get authentication client secret key
   * @static
   * @returns {String}
   * @memberof CredentialsManager
   */
  static getClientSecret() {
    return process.env.clientSecret;
  }
  /**
   * Get authentication client ID
   * @static
   * @returns {String}
   * @memberof CredentialsManager
   */
  static getClientID() {
    return process.env.clientID;
  }
  static getGithubOAuthURL() {
    return process.env.githubOAuthURL;
  }
}

module.exports = CredentialsManager;
