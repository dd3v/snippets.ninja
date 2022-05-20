<template>
  <div class="snippet-list-toolbar-wrapper">
    <div>
      <u-button circle @click="toggle">
        <u-icon icon="menu" />
      </u-button>
    </div>
    <div>
      <u-input
        type="text"
        v-model="a"
        variant="invisible"
        name="filter"
        placeholder="Search term"
      />
    </div>
    <div>
      <u-button circle @click="add">
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
</style>