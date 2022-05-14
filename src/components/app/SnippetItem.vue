<template>
  <div class="snippet">
    <div class="title">
      <span><u-icon icon="heart-empty" /> {{ snippet.title }}</span>
    </div>
    <div class="info">
      <span class="snippet-language"><u-icon icon="code" /> PHP</span>
      <span class="snippet-date">1/1/22</span>
    </div>
  </div>
</template>
<script>
import UIcon from '../core/UIcon.vue';

export default {
  components: { UIcon },
  props: {
    snippet: Object,
  },
  setup() {},
};
</script>
<style scoped>
.snippet {
  cursor: pointer;
  color: inherit;
  margin: 5px 0px 5px 0px;
  padding: 1px 5px 1px 5px;
}

.snippet .title {
  display: flex;
  justify-content: space-between;
}

.snippet .info {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #686669;
}
</style>
