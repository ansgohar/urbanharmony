'use strict';

/**
 * Projects.js controller
 *
 * @description: A set of functions called "actions" for managing `Projects`.
 */

module.exports = {

  /**
   * Retrieve projects records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.projects.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a projects record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.projects.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an projects record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.projects.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an projects record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.projects.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an projects record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.projects.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
