<template>
  <span class="ui-tag"> <ui-icon icon="tag"/> {{ name }} </span>
</template>
<script>
export default {
  name: 'UiTag',
  props: {
    name: String,
  },
};
</script>
<style scoped>
.ui-tag {
  cursor: pointer;
  padding: 2px;
  color: #3f536e;
}
</style>
