<template>
  <div class="left-block">
    <main-navigation :items="menus" default="all" @update="handleNavigationUpdate" />
    <hr />
    <tag-navigation :items="tags" @update="handleTagsUpdate" />
  </div>
  <div class="middle-block">
    <snippet-list :items="snippets" />
  </div>
  <code-editor />
</template>

<script>
import SnippetList from './components/app/SnippetList.vue';
import CodeEditor from './components/app/CodeEditor.vue';
import TagNavigation from './components/app/TagNavigation.vue';
import MainNavigation from './components/app/MainNavigation.vue';

export default {
  name: 'App',
  setup() {
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
        title: 'Snippet 1',
        favorite: true,
      },
      {
        title: 'Scope Resolution Operator (::)',
        favorite: false,
      },
      {
        title: 'SQL AGGR',
        favorite: false,
      },
      {
        title: 'Snippet 2',
        favorite: false,
      },
      {
        title: 'Quick flexbox input-group',
        favorite: false,
      },
    ];
    const tags = ['PHP', 'JS', 'Notes', 'Data', 'Fixes', 'Apps', 'Ideas', 'GO', 'MySQL'];

    const handleTagsUpdate = (values) => console.log(values);
    const handleNavigationUpdate = (value) => console.log(value);

    return {
      menus,
      tags,
      snippets,
      handleTagsUpdate,
      handleNavigationUpdate,
    };
  },
  components: {
    MainNavigation,
    TagNavigation,
    SnippetList,
    CodeEditor,
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
  color: #6a686e;
  width: 300px;
  border-right: 1px solid #f1f1f1;
  padding: 5px;
  height: 100%;
  background: #fbfbfb;
}
.middle-block {
  width: 400px;
  z-index: 1;
  padding: 5px;
  color: #6a686e;
}
</style>
