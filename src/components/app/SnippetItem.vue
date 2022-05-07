<template>
  <div class="snippet">
    <div class="snippet-title">
      <span>Snippet 1</span>
      <button type="button"><ui-icon icon="heart-empty" /></button>
    </div>
    <div class="snippet-info">
      <span class="snippet-language">PHP</span>
      <span class="snippet-date">2 days ago</span>
    </div>
  </div>
</template>
<script>
export default {
  setup() {},
};
</script>
<style scoped>
.snippet {
  margin: 10px 0px 10px 0px;
  cursor: pointer;
}

.snippet:hover {
  background-color: yellow;
}

.snippet-title {
  display: flex;
  justify-content: space-between;
}

.snippet-info {
  display: flex;
  justify-content: space-between;
}
</style>
