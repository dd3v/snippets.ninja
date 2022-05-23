/* eslint-disable object-shorthand */
import connection from './db/connection';

export default class SnippetStorage {
  constructor() {
    this.tableName = 'snippets';
  }


  search(conditions, limit = 100, skip = 0) {
    console.log(conditions.tags);

    const whereConditions = {};

    if (conditions.tags.length) {
      Object.assign(whereConditions, {
        tags: {
          in: [...conditions.tags],
        },
      });
    }
    Object.assign(whereConditions, { deleted: 0 });
    if (conditions.snippets === 'favorite') {
      Object.assign(whereConditions, { favorite: 1 });
    }
    if (conditions.term.trim().length) {
      Object.assign(whereConditions, { title: { like: `%${conditions.term}%` } });
    }

    console.warn(conditions);

    return connection.select({
      from: this.tableName,
      distinct: true,
      limit: limit,
      skip: skip,
      order: {
        by: 'created_at',
        type: conditions.sort,
      },
      where: whereConditions,
    });
  }

  create(entity) {
    return connection.insert({
      into: this.tableName,
      values: [entity],
      return: true,
    });
  }

  tags() {
    return connection.select({
      from: this.tableName,
      groupBy: 'tags',
    });
  }
}
