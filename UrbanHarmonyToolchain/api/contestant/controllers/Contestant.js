'use strict';

/**
 * Contestant.js controller
 *
 * @description: A set of functions called "actions" for managing `Contestant`.
 */

module.exports = {

  /**
   * Retrieve contestant records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.contestant.fetchAll(ctx.query);
  },

  /**
   * Retrieve a contestant record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.contestant.fetch(ctx.params);
  },

  /**
   * Create a/an contestant record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.contestant.add(ctx.request.body);
  },

  /**
   * Update a/an contestant record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.contestant.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an contestant record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.contestant.remove(ctx.params);
  }
};
