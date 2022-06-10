<template>
  <div class="snippet-list-wrapper" ref="scroll">
    <div class="snippet-list">
      <transition-group tag="ul" name="fade">
        <li
          tabindex="0"
          v-for="snippet in items"
          :key="snippet.id"
          :class="{ active: selected?.id === snippet.id }"
          @keydown.delete="$emit('snippets:delete', snippet)"
          @click="handleSelect(snippet)"
        >
          <snippet-item :snippet="snippet" />
        </li>
      </transition-group>
    </div>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import SnippetItem from '@/components/app/SnippetItem.vue';

defineProps({
  items: {
    type: Array,
  },
  selected: {},
});

const emit = defineEmits(['update:selected', 'snippets:more', 'snippets:delete']);

const scroll = ref(null);
const handleSelect = (snippet) => {
  emit('update:selected', snippet);
};

const handleScroll = () => {
  const el = scroll.value;
  console.log(el.offsetHeight);
  console.log(el.scrollTop);
  console.log(el.scrollHeight);
  if (el.offsetHeight + el.scrollTop >= el.scrollHeight) {
    emit('snippets:more');
  }
};

onMounted(() => {
  scroll.value.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  // scroll.value.removeEventListener('scroll', handleScroll);
});

defineExpose({ scroll });
</script>
<style scoped>
.snippet-list-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px 5px 5px 5px;
  overflow-y: scroll;
  scroll-behavior: smooth;
}

.snippet-list {
  margin: 10px 0;
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
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01);
}

.fade-leave-active {
  position: absolute;
}
</style>
