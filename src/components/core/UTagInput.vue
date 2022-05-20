<template>
  <div class="tag-input-wrapper">
    <transition-group name="list" tag="ul">
      <li v-for="(tag, key) in tags" :key="key" class="tag-input-tag">
        <span @click="remove(key)" @keypress="remove(key)">&times;</span>{{ tag }}
      </li>
    </transition-group>
    <input
      type="text"
      v-model="tag"
      :placeholder="placeholder"
      class="tag-input-text"
      aria-label="Tag input"
      @keydown.enter="add"
      @keydown.,.prevent="add"
      @keydown.tab.prevent="add"
      @keydown.delete="removeLast"
    />
  </div>
</template>
<script>
import { ref } from '@vue/reactivity';
import { computed } from 'vue';

export default {
  emits: ['update:modelValue'],
  props: {
    max: {
      type: Number,
      default: 5,
    },
    placeholder: {
      type: String,
      default: 'Enter a tag',
    },
    modelValue: {
      type: Array,
    },
  },
  setup(props, { emit }) {
    console.warn(props);
    const tag = ref('');
    const tags = computed({
      get: () => props.modelValue,
      set: () => emit('update:modelValue', tags.value),
    });
    const remove = (index) => {
      tags.value.splice(index, 1);
    };
    const removeLast = () => {
      if (!tag.value.length) {
        tags.value.pop();
      }
    };
    const add = () => {
      if (tag.value.length > 0 && tags.value.length < props.max) {
        tags.value.push(tag.value);
      }
      tag.value = '';
    };

    return { tag, tags, add, remove, removeLast };
  },
};
</script>
<style scoped>
.tag-input-wrapper {
  display: flex;
  align-items: center;
  height: 23px;
}

.tag-input-tag {
  float: left;
  padding: 1px 8px;
  font-size: 0;
  line-height: 1.5;
  text-align: center;
  white-space: nowrap;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  outline: 0;
  color: #3f536e;
  border-color: #dfdfdf;
  background-color: #fbfbfb;
  font-size: 12px;
  margin-right: 5px;
}

.tag-input-tag > span {
  font-size: 10px;
  padding-right: 4px;
  margin: 0;
  cursor: pointer;
}

.tag-input-text {
  border: none;
  outline: none;
  font-size: inherit;
  background: none;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>