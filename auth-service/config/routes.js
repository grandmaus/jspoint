/**
 * Provides convinient namespace for application routes
 * @class RoutingManager
 */
class RoutingManager {
  /**
   * @static
   * @returns {String} Root adress
   * @memberof RoutingManager
   */
  static getApplicationRoot() {
    return '/';
  }
  /**
   * Set of authentication related routes
   * @static
   * @memberof RoutingManager
   */
  static getAuthenticationRoutes() {
    return {
      login: '/login',
      logout: '/logout',
      redirect: '/redirect'
    };
  }
}

module.exports = RoutingManager;
