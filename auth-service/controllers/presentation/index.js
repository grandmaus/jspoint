const AvailableTemplates = require('../../views');

/**
 * Page rendering namespace
 * @class PresentationController
 */
class PresentationController {
  /**
   * Handle index page opening
   * @static
   * @param {Express.Request} request
   * @param {Express.Response} response
   * @memberof PresentationController
   */
  static getIndexPage(request, response) {
    response.render(AvailableTemplates.getTemplateReference().index);
  }
}

module.exports = PresentationController;
