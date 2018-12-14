/**
 * Helper collection of application presentation templates
 * @class TemplateCollection
 */
class TemplateCollection {
  /**
   * Returns map of available application view page templates
   * @static
   * @returns
   * @memberof TemplateCollection
   */
  static getTemplateReference() {
    return {
      index: 'index'
    };
  }
}

module.exports = TemplateCollection;
