<template>
  <span :class="`icon-${icon}`" :style="`color:${color}`"></span>
</template>
<script>
export default {
  name: 'UIcon',
  props: {
    icon: String,
    color: String,
  },
};
</script>
