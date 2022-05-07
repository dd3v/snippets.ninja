<template>
  <span :class="`icon-${icon}`"></span>
</template>
<script>
export default {
  name: 'UiIcon',
  props: {
    icon: String,
  },
  data: () => ({
    link: '',
  }),
};
</script>
<style scoped>
</style>
