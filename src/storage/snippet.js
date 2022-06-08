import faker from '@faker-js/faker';
import connection from './db/connection';

export default class SnippetStorage {
  constructor() {
    this.tableName = 'snippets';
  }

  search(conditions, skip = 0, limit = 100) {
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

    return connection.select({
      from: this.tableName,
      // distinct: true,
      limit,
      skip,
      order: {
        by: 'id',
        type: conditions.sort,
      },
      where: whereConditions,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  create(entity) {
    console.log(entity);

    
    // eslint-disable-next-line no-throw-literal
    throw faker.address.city();
    // return connection.insert({
    //   into: this.tableName,
    //   values: [entity],
    //   return: true,
    // });
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
        access_level: entity.access_level,
        code: entity.code,
        language: entity.language,
        favorite: entity.favorite,
        tags: entity.tags,
        editor_options: entity.editor_options,
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
