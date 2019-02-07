'use strict';

/**
 * Internalnews.js controller
 *
 * @description: A set of functions called "actions" for managing `Internalnews`.
 */

module.exports = {

  /**
   * Retrieve internalnews records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.internalnews.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a internalnews record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.internalnews.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an internalnews record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.internalnews.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an internalnews record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.internalnews.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an internalnews record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.internalnews.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
