'use strict';

/**
 * Journal.js controller
 *
 * @description: A set of functions called "actions" for managing `Journal`.
 */

module.exports = {

  /**
   * Retrieve journal records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.journal.fetchAll(ctx.query);
  },

  /**
   * Retrieve a journal record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.journal.fetch(ctx.params);
  },

  /**
   * Create a/an journal record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.journal.add(ctx.request.body);
  },

  /**
   * Update a/an journal record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.journal.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an journal record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.journal.remove(ctx.params);
  }
};
