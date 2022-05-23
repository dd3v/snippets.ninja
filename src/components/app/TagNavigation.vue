<template>
  <div class="tag-navigation-wrapper">
    <ul class="tags-navigation">
      <li v-for="(tag, key) in items" :key="key">
        <label :for="`tag-${key}`">
          <input type="checkbox" name="tag" :id="`tag-${key}`" v-model="selected" :value="tag" />
          <span> # {{ tag }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>
<script>
import { computed } from 'vue';

export default {
  name: 'TagNavigation',
  props: {
    modelValue: {
      type: Array,
    },
    items: {
      type: Array,
    },
  },
  setup(props, { emit }) {
    const selected = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    return { selected };
  },
};
</script>
<style scoped>
.tag-navigation-wrapper {
  padding: 5px;
  height: 100%;
}
.tags-navigation {
  overflow-y: auto;
  height: 80%;
  scroll-behavior: smooth;
}

ul.tags-navigation label {
  cursor: pointer;
}

ul.tags-navigation li label span {
  padding: 5px;
}

.tags-navigation label [type='checkbox'] {
  display: none;
}

input[type='checkbox']:checked + span {
  border-radius: 5px;
  background: hsl(264deg 10% 14% / 12%);
  color: #2b292e;
}
</style>
