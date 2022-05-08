<template>
  <div class="snippet-list-wrapper">
    <div class="input-group">
      <button type="button" class="btn">
        <ui-icon icon="menu" />
      </button>
      <label for="search">
        <input type="text" placeholder="Keywords.." id="search" name="search" />
      </label>
      <button type="button" class="btn">
        <ui-icon icon="plus" />
      </button>
    </div>
    <ul class="snippet-list">
      <li v-for="(snippet, key) in snippets" :key="key">
        <snippet-item :snippet="snippet" />
      </li>
    </ul>
  </div>
</template>
<script>
import SnippetItem from './SnippetItem.vue';

export default {
  components: { SnippetItem },
  name: 'SnippetList',
  setup() {},
  data: () => ({
    snippets: [
      {
        title: 'Snippet 1',
      },
      {
        title: 'Scope Resolution Operator (::)',
      },
      {
        title: 'SQL AGGR',
      },
      {
        title: 'Snippet 2',
      },
      {
        title: 'Quick flexbox input-group',
      },
    ],
  }),
};
</script>
<style scoped>
.snippet-list-wrapper {
  width: 400px;
  padding: 3px 0px 3px 0px;
  box-shadow: -1px 0px 2px 0px #eeecec;
}
</style>
