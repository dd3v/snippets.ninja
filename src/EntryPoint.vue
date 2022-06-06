<template>
  <div v-if="!indexedDBStatus()" class="container">IndexedDB is not supported.</div>
  <suspense v-else>
    <template #default><app /></template>
    <template #fallback>
      <div class="container">
        <div class="coffee-cup"></div>
      </div>
    </template>
  </suspense>
</template>
<script setup>
import App from '@/App.vue';

const indexedDBStatus = () => !!window.indexedDB;
</script>
<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-image: linear-gradient(120deg, #fdfbfb 0%, #f6f7f8 100%);
}

.coffee-cup {
  width: 20px;
  height: 24px;
  border: 1px rgb(64 62 62) solid;
  border-radius: 0px 0px 5px 5px;
  position: relative;
  margin: 36px auto;
}
.coffee-cup:after,
.coffee-cup:before {
  position: absolute;
  content: '';
}
.coffee-cup:after {
  width: 5px;
  height: 12px;
  border: 1px rgb(64 62 62) solid;
  border-left: none;
  border-radius: 0px 20px 20px 0px;
  left: 20px;
}
.coffee-cup:before {
  width: 1px;
  height: 6px;
  background-color: rgb(64 62 62);
  top: -10px;
  left: 4px;
  box-shadow: 5px 0px 0px 0px rgb(64 62 62), 5px -5px 0px 0px rgb(64 62 62),
    10px 0px 0px 0px rgb(64 62 62);
  -webkit-animation: steam 1s linear infinite alternate;
  -moz-animation: steam 1s linear infinite alternate;
  animation: steam 1s linear infinite alternate;
}

@-webkit-keyframes steam {
  0% {
    height: 0px;
  }
  100% {
    height: 6px;
  }
}
@-moz-keyframes steam {
  0% {
    height: 0px;
  }
  100% {
    height: 6px;
  }
}
@keyframes steam {
  0% {
    height: 0px;
  }
  100% {
    height: 6px;
  }
}
</style>