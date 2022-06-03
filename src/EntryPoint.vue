<template>
  <suspense>
    <app />
    <template #fallback> Loading... </template>
  </suspense>
</template>
<script setup>
import App from '@/App.vue';
</script>