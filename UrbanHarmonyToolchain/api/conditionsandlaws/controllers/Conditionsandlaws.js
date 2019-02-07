'use strict';

/**
 * Conditionsandlaws.js controller
 *
 * @description: A set of functions called "actions" for managing `Conditionsandlaws`.
 */

module.exports = {

  /**
   * Retrieve conditionsandlaws records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.conditionsandlaws.fetchAll(ctx.query);
  },

  /**
   * Retrieve a conditionsandlaws record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.conditionsandlaws.fetch(ctx.params);
  },

  /**
   * Create a/an conditionsandlaws record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.conditionsandlaws.add(ctx.request.body);
  },

  /**
   * Update a/an conditionsandlaws record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.conditionsandlaws.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an conditionsandlaws record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.conditionsandlaws.remove(ctx.params);
  }
};
