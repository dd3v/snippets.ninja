import { DATA_TYPE } from 'jsstore';
import connection from './connection';
import { welcomeSnippet } from '../../data/snippetEntity';

const getDb = () => {
  const tblSnippets = {
    name: 'snippets',
    columns: {
      id: {
        primaryKey: true,
        autoIncrement: true,
        dataType: DATA_TYPE.Number,
      },
      access_level: {
        notNull: true,
        dataType: DATA_TYPE.Number,
        default: 0,
      },
      title: {
        notNull: true,
        dataType: DATA_TYPE.String,
        default: 'Untitled',
        enableSearch: true,
      },
      language: {
        notNull: true,
        dataType: DATA_TYPE.String,
        enableSearch: true,
      },
      code: {
        dataType: DATA_TYPE.String,
        enableSearch: false,
      },
      tags: {
        dataType: DATA_TYPE.Array,
        multiEntry: true,
        default: [],
      },
      editor_options: {
        dataType: DATA_TYPE.Object,
        default: {},
      },
      favorite: {
        notNull: true,
        dataType: DATA_TYPE.Number,
        default: 0,
      },
      remote_id: {
        dataType: DATA_TYPE.Number,
        default: null,
      },
      last_sync: {
        dataType: DATA_TYPE.String,
        default: null,
      },
      created_at: {
        dataType: DATA_TYPE.String,
        notNull: true,
        enableSearch: true,
      },
      updated_at: {
        dataType: DATA_TYPE.String,
        notNull: true,
        enableSearch: true,
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
function timeout(ms) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const initStorage = async () => {
  const newDb = await connection.initDb(getDb());
  await timeout(3000);
  if (newDb === true) {
    await connection.insert({
      into: 'snippets',
      values: [welcomeSnippet],
      return: true,
    });
  }

  return newDb;
};

export default initStorage;
