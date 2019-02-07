'use strict';

/**
 * Consultingoffice.js controller
 *
 * @description: A set of functions called "actions" for managing `Consultingoffice`.
 */

module.exports = {

  /**
   * Retrieve consultingoffice records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.consultingoffice.fetchAll(ctx.query);
  },

  /**
   * Retrieve a consultingoffice record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.consultingoffice.fetch(ctx.params);
  },

  /**
   * Count consultingoffice records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.consultingoffice.count(ctx.query);
  },

  /**
   * Create a/an consultingoffice record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.consultingoffice.add(ctx.request.body);
  },

  /**
   * Update a/an consultingoffice record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.consultingoffice.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an consultingoffice record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.consultingoffice.remove(ctx.params);
  }
};
