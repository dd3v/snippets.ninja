<template>
  <div class="status-bar-wrapper">
    <slot />
    <ul>
      <li>Cursor: {{ state.cursor }}</li>
      <li>Lines: {{ state.lines }}</li>
      <li>Length: {{ state.length }}</li>
      <li>Selected: {{ state.selected }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'EditorStatusBar',
  props: {
    state: Object,
  },
  setup() {},
};
</script>
<style scoped>
.status-bar-wrapper {
  display: inline-flex;
  justify-content: space-between;
  padding: 0px 2px 0px 2px;
  align-items: center;
  height: 20px;
  background: transparent;
}
ul {
  background: transparent;
  font-size: 12px;
}
ul li {
  float: left;
}
</style>