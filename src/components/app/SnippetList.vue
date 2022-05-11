<template>
  <div class="input-group">
    <button type="button" class="btn btn-circle">
      <u-icon icon="menu" />
    </button>
    <label for="search">
      <input type="text" class="input-inv" placeholder="Keywords.." id="search" name="search" />
    </label>
    <button type="button" class="btn btn-circle">
      <u-icon icon="plus" />
    </button>
  </div>
  <ul class="snippet-list">
    <li v-for="(snippet, key) in items" :key="key">
      <snippet-item :snippet="snippet" />
    </li>
  </ul>
</template>
<script>
import SnippetItem from './SnippetItem.vue';

export default {
  components: { SnippetItem },
  name: 'SnippetList',
  props: {
    items: Array,
  },
  setup() {},
};
</script>
<style scoped>
.snippet-list li {
  border-bottom: 1px solid hsl(240deg 2% 88% / 44%);
}
.snippet-list li:last-child {
  border-bottom: none;
}
</style>
