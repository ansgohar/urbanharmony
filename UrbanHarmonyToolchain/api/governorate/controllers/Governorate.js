'use strict';

/**
 * Governorate.js controller
 *
 * @description: A set of functions called "actions" for managing `Governorate`.
 */

module.exports = {

  /**
   * Retrieve governorate records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.governorate.fetchAll(ctx.query);
  },

  /**
   * Retrieve a governorate record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.governorate.fetch(ctx.params);
  },

  /**
   * Create a/an governorate record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.governorate.add(ctx.request.body);
  },

  /**
   * Update a/an governorate record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.governorate.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an governorate record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.governorate.remove(ctx.params);
  }
};
