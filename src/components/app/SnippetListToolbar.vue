<template>
  <div class="snippet-list-toolbar-wrapper">
    <div>
      <u-button circle @click="$emit('navigation:toggle')">
        <u-icon icon="menu" />
      </u-button>
    </div>
    <div class="filter-group">
      <u-input
        type="text"
        :value="term"
        @input="$emit('update:term', $event.target.value)"
        name="term"
        placeholder="Search term"
      />
      <u-button @click="$emit('update:sort', sort === 'desc' ? 'asc' : 'desc')">
        <u-icon :icon="sort === 'desc' ? 'sort-alt-down' : 'sort-alt-up'" />
      </u-button>
    </div>
    <div>
      <u-button circle @click="$emit('snippet:create')">
        <u-icon icon="plus" />
      </u-button>
    </div>
  </div>
</template>
<script>
import UButton from '../core/UButton.vue';
import UInput from '../core/UInput.vue';

export default {
  name: 'SnippetListToolbar',
  components: { UButton, UInput },
  props: {
    sort: {
      type: String,
      default: 'desc',
    },
    term: {
      type: String,
      default: '',
    },
  },
  setup(_, { emit }) {
    const toggle = () => {
      emit('navigation');
    };

    const add = () => {
      emit('snippet');
    };

    return { toggle, add };
  },
};
</script>
<style scoped>
.snippet-list-toolbar-wrapper {
  justify-content: space-between;
  align-items: center;
  display: inline-flex;
  padding: 5px;
}

.filter-group {
  width: 70%;
}

.filter-group input {
  padding-right: 25px;
}

.filter-group button {
  margin-left: -25px;
}
</style>