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
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-size: 13px;
}

ul {
  display: inline-flex;
  flex-direction: row;
  margin-left: auto;
}
</style>