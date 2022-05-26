<template>
  <div class="snippet">
    <div class="snippet-content">
      <span>
        <u-icon
          :color="snippet.favorite ? 'var(--like-color)' : ''"
          :icon="snippet.favorite ? 'heart' : 'heart-empty'"
        />
      </span>
      <span style="flex: 1">
        <span v-if="title">{{ title }}</span>
        <span class="italic-text" v-else>Untitled</span>
      </span>
      <span><u-icon icon="cloud" /></span>
    </div>
    <div class="snippet-content small-text">
      <span class="snippet-language"><u-icon icon="code" /> {{ snippet.language }}</span>
      <span class="snippet-date">{{ datetime }}</span>
    </div>
  </div>
</template>
<script>
import { computed, inject } from 'vue';

export default {
  props: {
    snippet: {
      type: Object,
    },
  },
  setup(props) {
    const dayjs = inject('dayjs');
    const datetime = computed(() => dayjs(props.snippet.created_at).calendar());
    const title = computed(() =>
      props.snippet.title.length >= 27
        ? `${props.snippet.title.slice(0, 27)}..`
        : props.snippet.title
    );
    return { title, datetime };
  },
};
</script>
<style scoped>
.snippet {
  cursor: pointer;
  color: inherit;
  margin: 5px 0px 5px 0px;
  padding: 1px 5px 1px 5px;
}

.snippet-content {
  display: flex;
  justify-content: space-between;
}
</style>
