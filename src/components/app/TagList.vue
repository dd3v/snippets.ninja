<template>
  <div class="tag-list-wrapper">
    <ul class="vertical-list">
      <li>Favorite</li>
    </ul>
    <ul class="vertical-list">
      <li>PHP</li>
      <li>JS</li>
      <li>SQL</li>
      <li>CSS</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'TagList',
  setup() {},
};
</script>
<style scoped>
.tag-list-wrapper {
  width: 300px;
  border-right: 1px solid #f1f1f1;

  height: 100%;
}
</style>
