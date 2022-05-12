<template>
  <div class="input-group">
    <u-button circle>
      <u-icon icon="menu" />
    </u-button>
    <label for="search">
      <input type="text" placeholder="Keywords" name="search" />
    </label>
    <u-button circle>
      <u-icon icon="plus" />
    </u-button>
  </div>
  <ul class="snippet-list">
    <li v-for="(snippet, key) in items" :key="key" :class="{ active: current?.id === snippet.id }">
      <snippet-item :snippet="snippet" @click="handleSelect(key)" />
    </li>
  </ul>
</template>
<script>
import { ref } from '@vue/reactivity';
import UButton from '../ui/UButton.vue';
import SnippetItem from './SnippetItem.vue';

export default {
  name: 'SnippetList',
  emits: ['selected'],
  components: { SnippetItem, UButton },
  props: {
    items: Array,
  },
  setup(props, { emit }) {
    const current = ref(null);

    const handleSelect = (index) => {
      current.value = props.items[index];
      emit('selected', current.value);
    };

    return { handleSelect, current };
  },
};
</script>
<style scoped>
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

input[type='text'] {
  background: transparent;
  border: none;
  font-family: inherit;
}

input[type='text']:focus-visible {
  border: none;
  outline: none;
}
</style>
