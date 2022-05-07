<template>
  <div class="tag-list-wrapper">
    <ul>
      <li><ui-icon icon="box" />All snippets</li>
      <li><ui-icon icon="heart" /> Favorite</li>
    </ul>
    <ul>
      <li v-for="(tag, key) in tags" :key="key">
        <ui-tag :name="tag" />
      </li>
    </ul>
  </div>
</template>
<script>
import UiTag from '@/components/ui/UiTag.vue';

export default {
  name: 'TagList',
  setup() {},
  data: () => ({
    tags: ['PHP', 'JS', 'Notes', 'Data', 'TODO'],
  }),
  components: {
    UiTag,
  },
};
</script>
<style scoped>
.tag-list-wrapper {
  color: #686669;
  width: 300px;
  border-right: 1px solid #f1f1f1;
  padding: 0px 5px 0px 5px;
  height: 100%;
  background: #fafafa;
}
</style>
