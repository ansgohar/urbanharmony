'use strict';

/**
 * Regions.js controller
 *
 * @description: A set of functions called "actions" for managing `Regions`.
 */

module.exports = {

  /**
   * Retrieve regions records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.regions.fetchAll(ctx.query);
  },

  /**
   * Retrieve a regions record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.regions.fetch(ctx.params);
  },

  /**
   * Create a/an regions record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.regions.add(ctx.request.body);
  },

  /**
   * Update a/an regions record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.regions.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an regions record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.regions.remove(ctx.params);
  }
};
