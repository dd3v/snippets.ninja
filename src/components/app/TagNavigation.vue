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
import modelWrapper from '@/composable/modelWrapper';

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
    const selected = modelWrapper(props, emit);

    return { selected };
  },
};
</script>
<style scoped>
.tags-navigation {
  overflow-y: auto;
  height: 81vh;
  scroll-behavior: smooth;
  margin: 20px 0;
}
label {
  cursor: pointer;
}
span {
  padding: 5px;
}

label [type='checkbox'] {
  display: none;
}

input[type='checkbox']:checked + span {
  border-radius: 5px;
  background: var(--primary-bg-color);
  color: var(--primary-text-color);
}
</style>
