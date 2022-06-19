<template>
  <div v-if="indexedDBStatus()">IndexedDB is not supported 😔</div>
  <suspense v-else>
    <template #default><app /></template>
    <template #fallback>
      <splash-screen />
    </template>
  </suspense>
</template>
<script setup>
import App from '@/App.vue';
import SplashScreen from '@/SplashScreen.vue';

const indexedDBStatus = () => !window.indexedDB;

</script>
