import Dexie from 'dexie';

const db = new Dexie('snippets.ninja');

db.version(1).stores({
  snippets: '++id, title, favorite, language, code, *tags, cloud_id',
});
export default db;
