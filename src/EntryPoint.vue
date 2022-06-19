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
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

const toHours = (ms) => (ms / (1000 * 60 * 60)).toFixed(1);

const installPWA = () => {
  if (deferredPrompt !== undefined) {
    setTimeout(() => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'dismissed') {
          localStorage.setItem('PWAPrompt', new Date().getTime());
        }
      });
    }, 2000);
  }
  document.body.removeEventListener('click', installPWA);
};
const time = localStorage.getItem('PWAPrompt');
if (time === null || toHours((new Date()).getTime() - time) >= 24) {
  document.body.addEventListener('click', installPWA);
}
</script>
