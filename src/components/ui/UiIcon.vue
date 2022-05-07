<template>
  <span :class="`icon-${icon}`"></span>
</template>
<script>
export default {
  name: 'UiIcon',
  props: {
    icon: String,
  },
};
</script>
