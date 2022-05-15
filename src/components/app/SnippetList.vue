<template>
  <div class="snippet-list-wrapper">
    <div class="snippet-list-tools">
      <div>
        <u-button circle>
          <u-icon icon="menu" />
        </u-button>
      </div>
      <div>
        <u-input type="text" v-model="a" variant="invisible" name="filter" placeholder="Search term" />
      </div>
      <div>
        <u-button circle>
          <u-icon icon="plus" />
        </u-button>
      </div>
    </div>
    <ul class="snippet-list">
      <li
        v-for="(snippet, key) in items"
        :key="key"
        :class="{ active: current?.id === snippet.id }"
      >
        <snippet-item :snippet="snippet" @click="handleSelect(key)" />
      </li>
    </ul>
  </div>
</template>
<script>
import { ref } from '@vue/reactivity';
import UButton from '../core/UButton.vue';
import SnippetItem from './SnippetItem.vue';
import UInput from '../core/UInput.vue';

export default {
  name: 'SnippetList',
  emits: ['selected'],
  components: { SnippetItem, UButton, UInput },
  props: {
    items: Array,
  },
  setup(props, { emit }) {
    const current = ref(null);

    const a = ref('');

    const handleSelect = (index) => {
      current.value = props.items[index];
      emit('selected', current.value);
    };

    return { handleSelect, current, a };
  },
};
</script>
<style scoped>
.snippet-list-wrapper {
  padding: 5px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.snippet-list-tools {
  justify-content: space-between;
  align-items: center;
  display: inline-flex;
  width: 100%;
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
