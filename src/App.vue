<template>
  <tag-list />
  <snippet-list />
  <code-editor />
</template>

<script>
import SnippetList from './components/app/SnippetList.vue';
import CodeEditor from './components/app/CodeEditor.vue';
import TagList from './components/app/TagList.vue';

export default {
  name: 'App',
  components: {
    TagList,
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
</style>
