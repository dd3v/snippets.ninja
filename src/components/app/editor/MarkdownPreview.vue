<template>
  <div class="markdown-preview" v-html="markdown"></div>
</template>
<script setup>
import { computed } from 'vue';
import { marked } from 'marked';

const props = defineProps({
  source: {
    type: String,
    required: true,
  },
});

const markdown = computed({
  get: () => marked.parse(props.source),
});
</script>
<style scoped>
.markdown-preview {
  padding: 5px;
  overflow: auto;
  height: 100%;
}
</style>