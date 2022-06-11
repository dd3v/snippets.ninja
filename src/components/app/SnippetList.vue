<template>
  <transition-group tag="ul" name="fade" class="snippet-list">
    <li
      tabindex="0"
      v-for="snippet in items"
      :key="snippet.id"
      :class="{ active: selected?.id === snippet.id }"
      @keydown.delete="$emit('snippets:delete', snippet)"
      @click="$emit('update:selected', snippet)"
    >
      <snippet-item :snippet="snippet" />
    </li>
  </transition-group>
</template>
<script setup>
import SnippetItem from '@/components/app/SnippetItem.vue';

defineProps({
  items: {
    type: Array,
  },
  selected: {},
});
defineEmits(['update:selected', 'snippets:delete']);
</script>
<style scoped>
.snippet-list {
  list-style-type: none;
  line-height: 30px;
  padding: 2px;
}
.snippet-list li:hover {
  border-radius: 5px;
  background: var(--primary-bg-color);
  color: var(--primary-text-color);
}
.snippet-list li.active {
  border-radius: 5px;
  background: var(--primary-bg-color);
  color: var(--primary-text-color);
  box-shadow: var(--snippet-list-active-box-shadow);
}
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01);
}
</style>
