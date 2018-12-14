/**
 * Provides convinient namespace for application routes
 * @class RoutingManager
 */
class RoutingManager {
  /**
   * Set of authentication related routes
   * @static
   * @returns
   * @memberof RoutingManager
   */
  static getAuthenticationRoute() {
    return {
      login: '/login',
      logout: '/logout',
      redirect: '/redirect'
    };
  }
}

module.exports = RoutingManager;
