import { DATA_TYPE } from 'jsstore';
import connection from './connection';

const getDb = () => {
  const tblSnippets = {
    name: 'snippets',
    columns: {
      id: {
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        notNull: true,
        dataType: DATA_TYPE.String,
        default: 'Untitled',
      },
      language: {
        notNull: true,
        dataType: DATA_TYPE.String,
      },
      code: {
        dataType: DATA_TYPE.String,
      },
      tags: {
        dataType: DATA_TYPE.Array,
        multiEntry: true,
      },
      favorite: {
        notNull: true,
        dataType: DATA_TYPE.Number,
        default: 0,
      },
      remote_id: {
        dataType: DATA_TYPE.Number,
      },
      last_sync: {
        dataType: DATA_TYPE.String,
      },
      created: {
        dataType: DATA_TYPE.String,
      },
      updated: {
        dataType: DATA_TYPE.String,
      },
      deleted: {
        notNull: true,
        dataType: DATA_TYPE.Number,
        default: 0,
      },
    },
  };

  const database = {
    name: 'snippets_db',
    tables: [tblSnippets],
  };
  return database;
};

const initStorage = async () => {
  const config = getDb();
  const db = await connection.initDb(config);
  return db;
};

export default initStorage;
