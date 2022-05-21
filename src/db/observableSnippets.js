import { ref, watch } from 'vue';
import { liveQuery } from 'dexie';

const buildQuery = (collection, conditions) => {
  let snippets = collection.where('deleted').equals(0);

  if (conditions.sort === 'desc') {
    snippets = collection.reverse();
  }
  if (conditions.tags.length) {
    snippets = collection.where('tags').anyOf(conditions.tags);
  }
  if (conditions.snippets === 'favorite') {
    snippets = collection.where('favorite').equals(1);
  }

  return snippets.toArray();
};

const observableSnippets = (collection, conditions) => {
  const value = ref(null);

  const observable = liveQuery(async () => {
    const response = await buildQuery(collection, conditions);
    return response;
  });

  let subscription = observable.subscribe({
    next: (val) => {
      value.value = val;
    },
    error: null,
  });

  watch(
    conditions,
    () => {
      subscription.unsubscribe();
      subscription = observable.subscribe({
        next: (val) => {
          value.value = val;
        },
        error: null,
      });
    },
    { deep: true }
  );

  return value;
};

export default observableSnippets;
