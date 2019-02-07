'use strict';

/**
 * Incident.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all incidents.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    const convertedParams = strapi.utils.models.convertParams('incident', params);

    return Incident
      .find()
      .where(convertedParams.where)
      .sort(convertedParams.sort)
      .skip(convertedParams.start)
      .limit(convertedParams.limit)
      .populate(_.keys(_.groupBy(_.reject(strapi.models.incident.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to fetch a/an incident.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    return Incident
      .findOne(_.pick(params, _.keys(Incident.schema.paths)))
      .populate(_.keys(_.groupBy(_.reject(strapi.models.incident.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to add a/an incident.
   *
   * @return {Promise}
   */

  add: async (values) => {
    const query = await Incident.create(_.omit(values, _.keys(_.groupBy(strapi.models.incident.associations, 'alias'))));
    const data = query.toJSON ? query.toJSON() : query;

    await strapi.hook.mongoose.manageRelations('incident', _.merge(data, { values }));

    return query;
  },

  /**
   * Promise to edit a/an incident.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Note: The current method will return the full response of Mongo.
    // To get the updated object, you have to execute the `findOne()` method
    // or use the `findOneOrUpdate()` method with `{ new:true }` option.
    await strapi.hook.mongoose.manageRelations('incident', _.merge(_.clone(params), { values }));
    return Incident.update(params, values, { multi: true });
  },

  /**
   * Promise to remove a/an incident.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Incident.findOneAndRemove(params, {})
      .populate(_.keys(_.groupBy(_.reject(strapi.models.incident.associations, {autoPopulate: false}), 'alias')).join(' '));

    _.forEach(Incident.associations, async association => {
      const search = (_.endsWith(association.nature, 'One')) ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
      const update = (_.endsWith(association.nature, 'One')) ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

      await strapi.models[association.model || association.collection].update(
        search,
        update,
        { multi: true });
    });

    return data;
  }
};
