<template>
  <div class="tag-input-wrapper">
    <transition-group name="list" tag="ul">
      <li v-for="(tag, key) in tags" :key="key" class="tag-input-tag">
        <span @click="remove(key)" @keypress="remove(key)" :data-tag="tag" class="remove"
          >&times;</span
        >
        <span class="tag">{{ tag }}</span>
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
<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
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
});
const emit = defineEmits(['update:modelValue']);

const tag = ref('');
const tags = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
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
  if (!tags.value.includes(tag.value) && tag.value.length > 0 && tags.value.length < props.max) {
    tags.value.push(tag.value);
  }
  tag.value = '';
};
</script>
<style scoped>
.tag-input-wrapper {
  display: flex;
  align-items: center;
  height: 23px;
}

.tag-input-tag {
  display: inline-flex;
  align-items: center;
  padding: 1px 8px;
  line-height: 1.5;
  white-space: nowrap;
  border-radius: 4px;
  outline: 0;
  font-size: 12px;
  margin-right: 5px;
  border: var(--tag-input-tag-border);
  background-color: var(--tag-input-tag-background-color);
  color: var(--primary-text-color);
}

.tag-input-tag > span.remove {
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
  color: var(--invisible-input-color);
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