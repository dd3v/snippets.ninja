<template>
  <suspense>
    <app />
    <template #fallback> Loading... </template>
  </suspense>
</template>
<script>
import App from '@/App.vue';

export default {
  components: { App },
  setup() {
    return { App };
  },
};
</script>