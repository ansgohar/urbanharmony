'use strict';

/**
 * Petition.js controller
 *
 * @description: A set of functions called "actions" for managing `Petition`.
 */

module.exports = {

  /**
   * Retrieve petition records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.petition.fetchAll(ctx.query);
  },

  /**
   * Retrieve a petition record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.petition.fetch(ctx.params);
  },

  /**
   * Count petition records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.petition.count(ctx.query);
  },

  /**
   * Create a/an petition record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.petition.add(ctx.request.body);
  },

  /**
   * Update a/an petition record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.petition.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an petition record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.petition.remove(ctx.params);
  }
};
