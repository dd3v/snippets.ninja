<template>
  <div class="snippet-list-toolbar-wrapper">
    <u-button variant="circle" @click="$emit('navigation:toggle')" ariaLabel="Menu">
      <u-icon name="menu" />
    </u-button>
    <div class="filter-group">
      <u-input
        type="text"
        :value="term"
        @input="$emit('update:term', $event.target.value)"
        name="term"
        placeholder="Search term"
      />
      <u-button @click="$emit('update:sort', sort === 'desc' ? 'asc' : 'desc')" ariaLabel="Sort">
        <u-icon :name="sort === 'desc' ? 'sort-alt-down' : 'sort-alt-up'" />
      </u-button>
    </div>
    <u-button variant="circle" @click="$emit('snippet:create')" ariaLabel="New Snippet">
      <u-icon name="list-add" />
    </u-button>
  </div>
</template>
<script setup>
defineProps({
  sort: {
    type: String,
    default: 'desc',
  },
  term: {
    type: String,
    default: '',
  },
});

defineEmits(['navigation:toggle', 'snippet:create', 'update:term', 'update:sort']);
</script>
<style scoped>
.snippet-list-toolbar-wrapper {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
}

.filter-group input {
  padding-right: 25px;
}

.filter-group button {
  margin-left: -25px;
}
</style>