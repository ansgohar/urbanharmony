'use strict';

/**
 * Competitions.js controller
 *
 * @description: A set of functions called "actions" for managing `Competitions`.
 */

module.exports = {

  /**
   * Retrieve competitions records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.competitions.fetchAll(ctx.query);
  },

  /**
   * Retrieve a competitions record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.competitions.fetch(ctx.params);
  },

  /**
   * Create a/an competitions record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.competitions.add(ctx.request.body);
  },

  /**
   * Update a/an competitions record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.competitions.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an competitions record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.competitions.remove(ctx.params);
  }
};
