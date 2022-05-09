<template>
  <span :class="`icon-${icon}`" :style="`color:${color}`"></span>
</template>
<script>
export default {
  name: 'UiIcon',
  props: {
    icon: String,
    color: String,
  },
};
</script>
