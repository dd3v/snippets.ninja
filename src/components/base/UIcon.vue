<template>
  <span :class="`icon-${icon}`" :style="`color:${color};font-size:${fontSize};`"></span>
</template>
<script>
export default {
  name: 'UIcon',
  props: {
    icon: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    fontSize: {
      type: String,
    },
  },
};
</script>
