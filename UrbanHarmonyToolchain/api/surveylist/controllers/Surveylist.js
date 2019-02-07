'use strict';

/**
 * Surveylist.js controller
 *
 * @description: A set of functions called "actions" for managing `Surveylist`.
 */

module.exports = {

  /**
   * Retrieve surveylist records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    console.log(ctx);
    return strapi.services.surveylist.fetchAll(ctx.query);
  },

  /**
   * Retrieve a surveylist record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.surveylist.fetch(ctx.params);
  },

  /**
   * Create a/an surveylist record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.surveylist.add(ctx.request.body);
  },

  /**
   * Update a/an surveylist record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.surveylist.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an surveylist record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.surveylist.remove(ctx.params);
  }
};
