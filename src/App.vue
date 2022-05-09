<template>
  <div class="left-block">
    <main-navigation :items="menus" default="all" @update="handleMainMenuUpdate"/>
    <tag-navigation :items="tags" @update="handleTagsUpdate"/>
  </div>
  <snippet-list />
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
    const tags = ['PHP', 'JS', 'Notes', 'Data', 'Fixes', 'Apps', 'Ideas', 'GO', 'MySQL'];

    const handleTagsUpdate = (values) => console.log(values);
    const handleMainMenuUpdate = (value) => console.log(value);

    return {
      menus, tags, handleTagsUpdate, handleMainMenuUpdate,
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
  color: #6a686e;
  width: 300px;
  border-right: 1px solid #f1f1f1;
  padding: 5px;
  height: 100%;
  background: #fbfbfb;
}
</style>
