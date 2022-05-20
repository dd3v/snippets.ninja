<template>
  <div class="snippet-list-wrapper">
    <ul class="snippet-list">
      <li
        v-for="snippet in items"
        :key="snippet.id"
        :class="{ active: current?.id === snippet.id }"
      >
        <snippet-item :snippet="snippet" @click="handleSelect(snippet.id)" />
      </li>
    </ul>
  </div>
</template>
<script>
import { ref } from '@vue/reactivity';
import SnippetItem from './SnippetItem.vue';

export default {
  name: 'SnippetList',
  emits: ['snippet:select'],
  components: { SnippetItem },
  props: {
    items: {
      type: Array,
    },
  },
  setup(props, { emit }) {
    const current = ref(null);
    const handleSelect = (id) => {
      current.value = props.items.find((item) => item.id === id);
      emit('snippet:select', current.value);
    };
    return { handleSelect, current };
  },
};
</script>
<style scoped>
.snippet-list-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px;
}

.snippet-list {
  overflow-y: scroll;
  margin: 10px 0;
}

.snippet-list li {
  border-bottom: 1px solid hsl(240deg 2% 88% / 44%);
}

.snippet-list li:hover {
  border-radius: 5px;
  background: hsl(264deg 10% 14% / 12%);
  color: #2b292e;
}

.active {
  border-radius: 5px;
  background: hsl(264deg 10% 14% / 12%);
  color: #2b292e;
}

.snippet-list li:last-child {
  border-bottom: none;
}
</style>
