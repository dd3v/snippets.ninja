<template>
  <aside class="left-block" :class="{ hide: sidebar }">
    <main-navigation :items="menus" v-model="navigation" />
    <tag-navigation :items="tagList" v-model="tags" />
  </aside>
  <section class="middle-block" :class="{ hide: snippet }">
    <snippet-list-toolbar @navigation="sidebar = !sidebar" />
    <snippet-list :items="snippets" @selected="handleSelectSnippet" />
  </section>
  <section class="right-block" :class="{ hide: !snippet, flex: snippet }">
    <code-editor v-model="snippet" @close="snippet = false" v-if="snippet" />
  </section>
</template>

<script>
import { ref } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';
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

    const snippet = ref(false);
    const navigation = ref('all');
    const tags = ref(['PHP']);

    const menus = [
      {
        icon: 'box',
        label: 'All Snippets',
        value: 'all',
      },
      {
        icon: 'heart-empty',
        label: 'Favorite',
        value: 'favorite',
      },
      {
        icon: 'back-in-time',
        label: 'Recently modified',
        value: 'recently',
      },
    ];
    const snippets = [
      {
        id: '1',
        local_id: 1,
        title: 'Snippet 1 ❤️',
        favorite: true,
        tags: ['PHP', 'JS'],
        code: 'hello',
        language: 'test',
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
    const tagList = ['PHP', 'JS', 'Notes', 'Data', 'Fixes', 'Apps', 'Ideas', 'GO', 'MySQL'];
    // snippet.value = snippets.shift();
    const handleSelectSnippet = (value) => {
      snippet.value = value;
    };

    watch(
      snippet,
      () => {
        console.warn(snippet.value.title);
        console.warn(snippet.value.tags);
        console.warn(snippet.value.language);
      },
      {
        deep: true,
      }
    );
    watch(navigation, () => {
      console.warn(navigation);
    });

    watch(tags, () => {
      console.warn(tags);
    });

    return {
      menus,
      tagList,
      snippets,
      handleSelectSnippet,
      snippet,
      navigation,
      tags,
      sidebar,
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

.left-block.hide {
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
  .left-block {
    margin-left: -210px;
  }
  .left-block.hide {
    margin-left: 0;
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
