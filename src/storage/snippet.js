/* eslint-disable object-shorthand */
import connection from './db/connection';

export default class SnippetStorage {
  constructor() {
    this.tableName = 'snippets';
  }

  search(conditions, limit = 100, skip = 0) {
    console.log(conditions);

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
    console.warn(limit + skip);

    return connection.select({
      from: this.tableName,
      // distinct: true,
      limit: limit,
      skip: skip,
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

  softDelete(entity) {
    return connection.update({
      in: this.tableName,
      set: {
        deleted: 1,
        updated_at: new Date().toISOString(),
      },
      where: {
        id: entity.id,
      },
    });
  }

  update(entity) {
    return connection.update({
      in: this.tableName,
      set: {
        title: entity.title,
        code: entity.code,
        language: entity.language,
        favorite: entity.favorite,
        tags: [...entity.tags],
        updated_at: new Date().toISOString(),
      },
      where: {
        id: entity.id,
      },
    });
  }

  tags() {
    return connection.select({
      from: this.tableName,
      flatten: ['tags'],
      groupBy: 'tags',
    });
  }
}
