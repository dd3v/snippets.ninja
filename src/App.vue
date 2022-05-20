<template>
  <aside class="left-block" :class="{ active: sidebar }">
    <main-navigation :items="menuItems" v-model="conditions.snippets" />
    <tag-navigation :items="tagList" v-model="conditions.tags" />
  </aside>
  <section class="middle-block" :class="{ hide: snippet }">
    <snippet-list-toolbar @snippet="handleAddSnippet" @navigation="sidebar = !sidebar" />
    <snippet-list :items="snippets" @selected="handleSelectSnippet" />
  </section>
  <section class="right-block" :class="{ hide: !snippet }">
    <code-editor v-model="snippet" @close="snippet = false" v-if="snippet" />
  </section>
</template>

<script>
import { ref } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';
// import { useObservable } from '@vueuse/rxjs';
// import { liveQuery } from 'dexie';
import db from './db/db';

import menuItems from './data/menu';
import SnippetList from './components/app/SnippetList.vue';
import CodeEditor from './components/app/CodeEditor.vue';
import TagNavigation from './components/app/TagNavigation.vue';
import MainNavigation from './components/app/MainNavigation.vue';
import SnippetListToolbar from './components/app/SnippetListToolbar.vue';

export default {
  name: 'App',
  components: {
    MainNavigation,
    TagNavigation,
    SnippetList,
    SnippetListToolbar,
    CodeEditor,
  },
  setup() {
    const sidebar = ref(false);
    const conditions = ref({
      snippets: 'all',
      tags: [],
    });

    console.log(conditions);

    const snippet = ref(false);
    const navigation = ref('all');
    const tagList = ref(['PHP']);
    const snippets = ref([]);

    snippets.value = [
      {
        id: '1',
        local_id: 1,
        title: 'Snippet 1 ❤️',
        favorite: true,
        tags: ['PHP', 'JS'],
        code: 'hello',
        language: 'PHP',
    
      },
      {
        id: '2',
        local_id: 2,
        title: 'Scope Resolution Operator (::)',
        favorite: false,
        tags: ['PHP'],
        language: 'PHP',
      },
      {
        id: '3',
        local_id: 3,
        title: 'SQL AGGR',
        favorite: false,
        tags: ['PHP'],
        language: 'PHP',
      },
      {
        id: '4',
        local_id: 4,
        title: 'Snippet 2',
        favorite: false,
        tags: ['PHP'],
        language: 'PHP',
      },
      {
        id: '5',
        local_id: 5,
        title: 'Quick flexbox input-group',
        favorite: false,
        tags: ['PHP'],
        language: 'PHP',
      },
    ];

    db.snippets.orderBy('tags').uniqueKeys((response) => {
      tagList.value = response;
    });
    // snippet.value = snippets.shift();
    const handleSelectSnippet = (value) => {
      snippet.value = value;
    };

    const handleAddSnippet = () => {
      db.snippets.add({
        cloud_id: null,
        title: 'Snippet NEW',
        favorite: true,
        tags: ['a'],
        code: 'hello',
        language: 'test',
      });
    };

    watch(
      snippet,
      () => {
        console.warn(snippet.value);
      },
      {
        deep: true,
      }
    );
    watch(
      conditions,
      () => {
        console.warn(conditions);
      },
      {
        deep: true,
      }
    );

    return {
      conditions,
      menuItems,
      tagList,
      snippets,
      snippet,
      navigation,
      sidebar,
      handleSelectSnippet,
      handleAddSnippet,
    };
  },
};
</script>

<style>
#app {
  display: flex;
  height: 100%;
  position: relative;
}

.left-block {
  display: flex;
  flex-direction: column;
  color: #6a686e;
  max-width: 210px;
  min-width: 210px;
  height: 100%;
  background: #fbfbfb;
  transition: all 0.3s;
}

.left-block.active {
  margin-left: -210px;
}

.middle-block {
  display: flex;
  flex-direction: column;
  min-width: 250px;
  z-index: 1;
  height: 100%;
  color: #6a686e;
  border-right: 1px solid #f1f1f1;
  border-left: 1px solid #f1f1f1;
}
.right-block {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.m-button {
  display: none;
}

@media (max-width: 650px) {
  .left-block.active {
    margin-left: 0;
  }
  .left-block {
    margin-left: -210px;
  }
  body {
    border: 1px solid red;
  }

  .hide {
    display: none;
  }
  .middle-block {
    width: 100%;
  }
  .m-button {
    display: inline-flex;
  }
}
</style>
