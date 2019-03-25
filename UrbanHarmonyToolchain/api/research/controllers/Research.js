'use strict';

/**
 * Research.js controller
 *
 * @description: A set of functions called "actions" for managing `Research`.
 */

module.exports = {

  /**
   * Retrieve research records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.research.fetchAll(ctx.query);
  },

  /**
   * Retrieve a research record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.research.fetch(ctx.params);
  },

  /**
   * Count research records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.research.count(ctx.query);
  },

  /**
   * Create a/an research record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.research.add(ctx.request.body);
  },

  /**
   * Update a/an research record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.research.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an research record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.research.remove(ctx.params);
  }
};
