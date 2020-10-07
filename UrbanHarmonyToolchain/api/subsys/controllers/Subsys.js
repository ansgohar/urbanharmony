'use strict';

/**
 * Subsys.js controller
 *
 * @description: A set of functions called "actions" for managing `Subsys`.
 */

module.exports = {

  /**
   * Retrieve subsys records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.subsys.fetchAll(ctx.query);
  },

  /**
   * Retrieve a subsys record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.subsys.fetch(ctx.params);
  },

  /**
   * Count subsys records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.subsys.count(ctx.query);
  },

  /**
   * Create a/an subsys record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.subsys.add(ctx.request.body);
  },

  /**
   * Update a/an subsys record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.subsys.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an subsys record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.subsys.remove(ctx.params);
  }
};
