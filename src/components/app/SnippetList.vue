<template>
  <div class="input-group">
    <u-button circle>
      <u-icon icon="menu" />
    </u-button>
    <label for="search">
      <input type="text" class="input-inv" placeholder="Keywords.." id="search" name="search" />
    </label>
    <u-button circle>
      <u-icon icon="plus" />
    </u-button>
  </div>
  <ul class="snippet-list">
    <li v-for="(snippet, key) in items" :key="key">
      <snippet-item :snippet="snippet" />
    </li>
  </ul>
</template>
<script>
import UButton from '../ui/UButton.vue';
import SnippetItem from './SnippetItem.vue';

export default {
  components: { SnippetItem, UButton },
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
