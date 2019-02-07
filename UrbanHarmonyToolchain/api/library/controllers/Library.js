'use strict';

/**
 * Library.js controller
 *
 * @description: A set of functions called "actions" for managing `Library`.
 */

module.exports = {

  /**
   * Retrieve library records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.library.fetchAll(ctx.query);
  },

  /**
   * Retrieve a library record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.library.fetch(ctx.params);
  },

  /**
   * Create a/an library record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.library.add(ctx.request.body);
  },

  /**
   * Update a/an library record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.library.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an library record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.library.remove(ctx.params);
  }
};
