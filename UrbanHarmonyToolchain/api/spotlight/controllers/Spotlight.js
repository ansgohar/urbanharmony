'use strict';

/**
 * Spotlight.js controller
 *
 * @description: A set of functions called "actions" for managing `Spotlight`.
 */

module.exports = {

  /**
   * Retrieve spotlight records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.spotlight.fetchAll(ctx.query);
  },

  /**
   * Retrieve a spotlight record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.spotlight.fetch(ctx.params);
  },

  /**
   * Count spotlight records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.spotlight.count(ctx.query);
  },

  /**
   * Create a/an spotlight record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.spotlight.add(ctx.request.body);
  },

  /**
   * Update a/an spotlight record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.spotlight.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an spotlight record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.spotlight.remove(ctx.params);
  }
};
