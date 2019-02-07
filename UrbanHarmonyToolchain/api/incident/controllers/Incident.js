'use strict';

/**
 * Incident.js controller
 *
 * @description: A set of functions called "actions" for managing `Incident`.
 */

module.exports = {

  /**
   * Retrieve incident records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.incident.fetchAll(ctx.query);
  },

  /**
   * Retrieve a incident record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.incident.fetch(ctx.params);
  },

  /**
   * Create a/an incident record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.incident.add(ctx.request.body);
  },

  /**
   * Update a/an incident record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.incident.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an incident record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.incident.remove(ctx.params);
  }
};
