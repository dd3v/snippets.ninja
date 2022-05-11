<template>
  <span :class="`icon-${icon}`" :style="`color:${color};font-size:${fontSize};`"></span>
</template>
<script>
export default {
  name: 'UIcon',
  props: {
    icon: String,
    color: String,
    fontSize: String,
  },
};
</script>
