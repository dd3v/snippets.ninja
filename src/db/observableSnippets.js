import { ref, watch } from 'vue';
import { liveQuery } from 'dexie';

const buildQuery = (collection, conditions) => {
  let snippets = collection;

  if (conditions.value.tags.length) {
    snippets = collection.where('tags').anyOf(conditions.value.tags);
  }
  if (conditions.value.snippets === 'favorite') {
    snippets = collection.where('favorite').equal(true);
  }
  if (conditions.value.sort === 'desc') {
    snippets = collection.reverse();
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
          console.log(val);
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
