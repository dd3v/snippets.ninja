<template>
  <transition-group tag="ul" name="fade" class="tags-navigation">
    <li v-for="(tag, key) in items" :key="key">
      <label :for="`tag-${key}`">
        <input type="checkbox" name="tag" :id="`tag-${key}`" v-model="selected" :value="tag" />
        <span> # {{ tag }}</span>
      </label>
    </li>
  </transition-group>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array,
  },
  items: {
    type: Array,
  },
});
const emit = defineEmits(['update:modelValue']);
const selected = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>
<style scoped>
.tags-navigation {
  list-style-type: none;
  padding: 0;
  line-height: 30px;
  word-break: break-all;
  overflow-y: auto;
  scroll-behavior: smooth;
  padding: 5px;
  height: 100%;
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

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01);
}
</style>
