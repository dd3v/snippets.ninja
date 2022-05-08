<template>
  <div class="snippet">
    <div class="snippet-title">
      <span><ui-icon icon="heart-empty" /> {{ snippet.title }}</span>
    </div>
    <div class="snippet-info">
      <span class="snippet-language">PHP</span>
      <span class="snippet-date">1/1/22</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    snippet: Object,
  },
  setup() {},
};
</script>
<style scoped>
.snippet {
  margin: 10px 0px 10px 0px;
  cursor: pointer;
  padding: 4px;
}

.snippet:hover {
  background-color: #FAFAFB;
}

.snippet-title {
  display: flex;
  justify-content: space-between;
}

.snippet-info {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color:#686669;
}
</style>
