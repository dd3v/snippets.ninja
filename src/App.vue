<template data-theme="light">
  <aside class="left-block" :class="{ active: sidebar }">
    <main-navigation :items="menu" v-model="conditions.snippets" />
    <tag-navigation :items="tags" v-model="conditions.tags" />
    <section class="">
      <u-button circle @click="theme = setupTheme(theme === 'light' ? 'dark' : 'light')">
        <u-icon :name="theme == 'light' ? 'moon-inv' : 'sun-inv'" />
      </u-button>
    </section>
  </aside>
  <section class="middle-block" :class="{ hide: snippet }">
    <snippet-list-toolbar
      v-model:sort="conditions.sort"
      v-model:term="conditions.term"
      @snippet:create="createSnippet"
      @navigation:toggle="sidebar = !sidebar"
    />
    <snippet-list
      ref="snippetScroll"
      :items="snippets"
      @snippets:more="loadMore"
      @snippets:delete="deleteSnippet"
      v-model:selected="snippet"
    />
  </section>
  <section class="right-block" :class="{ hide: !snippet }">
    <code-editor
      v-model="snippet"
      :theme="theme"
      @snippet:delete="deleteSnippet"
      @snippet:close="snippet = false"
      v-if="snippet"
    />
  </section>
</template>

<script>
import { onMounted, reactive, ref, toRaw, watch } from 'vue';
// import faker from '@faker-js/faker';
import setupTheme from '@/composable/themeSwitcher';
import initStorage from './storage/db/idb';
import menu from './data/menu';
import snippetEntity from './data/snippetEntity';
import SnippetList from './components/app/SnippetList.vue';
import CodeEditor from './components/app/editor/CodeEditor.vue';
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
    const theme = ref('');
    const sidebar = ref(false);
    const snippetScroll = ref('');
    const defaultConditions = {
      snippets: 'all',
      tags: [],
      sort: 'desc',
      term: '',
    };
    const tags = ref([]);
    const snippet = ref(false);
    const snippets = ref([]);
    const limit = 100;
    let skip = 0;

    const conditions = reactive({ ...defaultConditions });
    const snippetStorage = new SnippetStorage();
    snippetStorage.tags().then((response) => {
      tags.value = response.map((item) => item.tags);
      tags.value.sort();
    });

    const createSnippet = () => {
      snippetStorage.create(snippetEntity).then((response) => {
        Object.assign(conditions, defaultConditions);
        snippets.value.unshift(...response);
        snippet.value = snippets.value[0] ?? false;
        snippetScroll.value.scroll.scrollTo({
          top: 1,
          behavior: 'smooth',
        });
      });
    };

    const deleteSnippet = (value) => {
      snippetStorage.softDelete(value).then(() => {
        snippets.value.splice(snippets.value.map((item) => item.id).indexOf(value.id), 1);
        snippet.value = null;
      });
    };

    const loadMore = () => {
      skip += limit;
      snippetStorage.search(conditions, limit, skip).then((response) => {
        snippets.value.push(...response);
      });
    };

    watch(
      snippet,
      (current, previous) => {
        if (Object.is(current, previous) && current.id === previous.id) {
          const data = toRaw(snippet.value);
          snippetStorage.update(data).then(() => {
            tags.value.push(...data.tags.filter((item) => !tags.value.includes(item)));
            tags.value.sort();
          });
        }
      },
      {
        deep: true,
      }
    );
    watch(
      conditions,
      () => {
        skip = 0;
        snippetStorage.search(toRaw(conditions)).then((response) => {
          snippets.value = response;
        });
      },
      {
        deep: true,
        immediate: true,
      }
    );

    onMounted(async () => {
      theme.value = setupTheme(localStorage.getItem('theme'));
      try {
        await initStorage();
      } catch (e) {
        console.error(e);
      }
    });

    return {
      theme,
      setupTheme,
      snippetScroll,
      sidebar,
      conditions,
      menu,
      tags,
      snippets,
      snippet,
      deleteSnippet,
      createSnippet,
      loadMore,
    };
  },
};
</script>

<style>
#app {
  display: flex;
  height: 100%;
}

.left-block {
  display: flex;
  flex-direction: column;
  max-width: 210px;
  min-width: 210px;
  height: 100%;
  padding: 5px;
  transition: margin 0.3s;
  background: var(--aside-bg-color);
}

.left-block.active {
  margin-left: -220px;
}

.middle-block {
  display: flex;
  flex-direction: column;
  min-width: 300px;
  z-index: 1;
  height: 100%;
  color: var(--default-text-color);
  background: var(--body-bg);
  border-right: var(--snippets-border-right);
  border-left: var(--snippets-border-left);
}
.right-block {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--body-bg);
}

.m-button {
  display: none;
}

@media (max-width: 650px) {
  .left-block.active {
    margin-left: 0;
  }
  .left-block {
    margin-left: -220px;
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
