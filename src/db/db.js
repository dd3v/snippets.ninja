import Dexie from 'dexie';

const db = new Dexie('snippets.ninja');

db.version(1).stores({
  snippets: '++id, title, favorite, language, code, *tags, deleted, remote_id, last_sync, created_at, updated_at',
});
export default db;
