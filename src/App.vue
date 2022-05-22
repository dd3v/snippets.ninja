<template>
  <aside class="left-block" :class="{ active: sidebar }">
    <main-navigation :items="menu" v-model="conditions.snippets" />
    <tag-navigation :items="tags" v-model="conditions.tags" />
  </aside>
  <section class="middle-block" :class="{ hide: snippet }">
    <snippet-list-toolbar
      v-model:sort="conditions.sort"
      v-model:term="conditions.term"
      @snippet:create="createSnippet"
      @navigation:toggle="sidebar = !sidebar"
    />
    <snippet-list :items="snippets" @snippet:select="loadSnippet" />
  </section>
  <section class="right-block" :class="{ hide: !snippet }">
    <code-editor
      v-model="snippet"
      @snippet:delete="deleteSnippet"
      @snippet:close="snippet = false"
      v-if="snippet"
    />
  </section>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import initStorage from './storage/db/idb';

import menu from './data/menu';
import SnippetList from './components/app/SnippetList.vue';
import CodeEditor from './components/app/CodeEditor.vue';
import TagNavigation from './components/app/TagNavigation.vue';
import MainNavigation from './components/app/MainNavigation.vue';
import SnippetListToolbar from './components/app/SnippetListToolbar.vue';
import SnippetStorage from './storage/snippet';

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
      sort: 'desc',
      term: '',
      limit: 1,
    });

    const snippet = ref(false);

    const loadSnippet = (value) => {
      snippet.value = value;
    };

    const tags = ref(['php', 'test', 'go', 'a', 'b', 'c']);
    const snippets = ref([]);

    const snippetStorage = new SnippetStorage();

    snippetStorage.get().then(() => {
      //  console.log(response);
      // snippets.value = response;
    });

    const createSnippet = () => {
      snippetStorage
        .create({
          title: 'hello',
          favorite: 1,
          tags: ['go'],
          code: 'hello',
          language: 'test',
          deleted: 0,
          remote_id: null,
          last_sync: null,
          created: new Date().toISOString(),
          updated: new Date().toISOString(),
        })
        .then((response) => {
          console.log(response);
        });
    };

    const deleteSnippet = (value) => {
      console.log(value);
    };

    watch(snippet, () => console.warn(snippet.value), {
      deep: true,
    });
    watch(
      conditions,
      () => {
        snippetStorage.search(conditions.value).then((response) => {
          snippets.value = response
        });
      },
      {
        deep: true,
      }
    );

    onMounted(async () => {
      try {
        await initStorage();
      } catch (e) {
        console.error(e);
      }
    });

    return {
      sidebar,
      conditions,
      menu,
      tags,
      snippets,
      snippet,
      deleteSnippet,
      loadSnippet,
      createSnippet,
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
