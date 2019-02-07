'use strict';

/**
 * Conferences.js controller
 *
 * @description: A set of functions called "actions" for managing `Conferences`.
 */

module.exports = {

  /**
   * Retrieve conferences records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.conferences.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a conferences record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.conferences.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an conferences record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.conferences.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an conferences record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.conferences.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an conferences record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.conferences.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
