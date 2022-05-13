<template>
  <ul>
    <li>Cursor: {{ cursor }}</li>
    <li>Lines: {{ lines }}</li>
    <li>Length: {{ length }}</li>
    <li>Selected: {{ selected }}</li>
    <li></li>
    <li></li>
  </ul>
</template>
<script>
export default {
  name: 'CodeEditorState',
  props: {
    length: {
      type: Number,
      default: 0,
    },
    lines: {
      type: Number,
      default: 0,
    },
    cursor: {
      type: Number,
      default: 0,
    },
    selected: {
      type: Number,
      default: 0,
    },
  },
  setup() {},
};
</script>
<style scoped>
ul {
  background: transparent;
  font-size: 12px;
}
ul li {
  float: left;
}
</style>