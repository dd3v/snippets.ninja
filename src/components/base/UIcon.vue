<template>
  <span :class="`icon-${name}`" :style="`color:${color};font-size:${fontSize};`"></span>
</template>
<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  fontSize: {
    type: String,
  },
});
</script>
