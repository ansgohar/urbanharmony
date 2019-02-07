'use strict';

/**
 * Termsandabout.js controller
 *
 * @description: A set of functions called "actions" for managing `Termsandabout`.
 */

module.exports = {

  /**
   * Retrieve termsandabout records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.termsandabout.fetchAll(ctx.query);
  },

  /**
   * Retrieve a termsandabout record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.termsandabout.fetch(ctx.params);
  },

  /**
   * Count termsandabout records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.termsandabout.count(ctx.query);
  },

  /**
   * Create a/an termsandabout record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.termsandabout.add(ctx.request.body);
  },

  /**
   * Update a/an termsandabout record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.termsandabout.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an termsandabout record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.termsandabout.remove(ctx.params);
  }
};
