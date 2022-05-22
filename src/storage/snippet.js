import connection from './db/connection';

export default class SnippetStorage {
  constructor() {
    this.tableName = 'snippets';
  }

  get() {
    return connection.select({
      from: this.tableName,
    });
  }

  search(conditions) {
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

    console.warn(whereConditions);

    return connection.select({
      from: this.tableName,
      distinct: true,
      order: {
        by: 'id',
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
}
