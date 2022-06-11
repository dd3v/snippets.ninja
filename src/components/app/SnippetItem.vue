<template>
  <div class="snippet">
    <div class="snippet-content">
      <span>
        <u-icon
          :color="snippet.favorite ? 'var(--like-color)' : ''"
          :name="snippet.favorite ? 'heart' : 'heart-empty'"
        />
        <span v-if="title">{{ title }}</span>
        <span class="italic-text" v-else>Untitled</span>
      </span>
    </div>
    <div class="snippet-content text-small">
      <span><u-icon name="code" /> {{ snippet.language }}</span>
      <span>{{ datetime }}</span>
    </div>
  </div>
</template>
<script setup>
import { computed, inject } from 'vue';

const props = defineProps({
  snippet: {
    type: Object,
  },
});
const dayjs = inject('dayjs');
const datetime = computed(() => dayjs(props.snippet.created_at).calendar());
const title = computed(() =>
  props.snippet.title.length >= 27 ? `${props.snippet.title.slice(0, 30)}..` : props.snippet.title
);
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

.text-small {
  font-size: 12px;
}

.italic-text {
  font-style: italic;
}
</style>
