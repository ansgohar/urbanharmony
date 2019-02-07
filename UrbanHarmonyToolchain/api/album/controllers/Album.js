'use strict';

/**
 * Album.js controller
 *
 * @description: A set of functions called "actions" for managing `Album`.
 */

module.exports = {

  /**
   * Retrieve album records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.album.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a album record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.album.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an album record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.album.add(ctx.request.body);
    console.log(data);
    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an album record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.album.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an album record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.album.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
