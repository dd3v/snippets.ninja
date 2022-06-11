<template>
  Tabs:
  <u-button @click="size--" ariaLabel="Increase indent">
    <u-icon name="minus" />
  </u-button>
  <span>{{ size }}</span>
  <u-button @click="size++" ariaLabel="Decrease indent">
    <u-icon name="plus" />
  </u-button>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Number,
  },
});
const emit = defineEmits(['update:modelValue']);
const size = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>