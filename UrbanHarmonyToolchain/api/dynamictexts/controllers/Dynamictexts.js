'use strict';

/**
 * Dynamictexts.js controller
 *
 * @description: A set of functions called "actions" for managing `Dynamictexts`.
 */

module.exports = {

  /**
   * Retrieve dynamictexts records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.dynamictexts.fetchAll(ctx.query);
  },

  /**
   * Retrieve a dynamictexts record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.dynamictexts.fetch(ctx.params);
  },

  /**
   * Count dynamictexts records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.dynamictexts.count(ctx.query);
  },

  /**
   * Create a/an dynamictexts record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.dynamictexts.add(ctx.request.body);
  },

  /**
   * Update a/an dynamictexts record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.dynamictexts.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an dynamictexts record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.dynamictexts.remove(ctx.params);
  }
};
