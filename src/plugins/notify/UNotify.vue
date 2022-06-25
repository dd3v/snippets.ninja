<template>
  <teleport to="body">
    <transition-group tag="ul" class="notifications">
      <li v-for="(notification, key) in notifications" :key="key">
        <div class="notify-wrapper" :class="notification.type">
          {{ notification.message }}
          <button @click="close(key)">&#x2715;</button>
        </div>
      </li>
    </transition-group>
  </teleport>
</template>
<script setup>
import { notifications, deleteNotification } from './api';

const close = (index) => deleteNotification(index);
</script>

<style scoped>
.notifications {
  display: flex;
  flex-direction: column;
  list-style: none;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 5;
  margin: 0;
  width: 250px;
  gap: 10px;
}

.notify-wrapper {
  box-shadow: 0 0 12px #999;
  border-radius: 6px;
  line-height: 20px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  word-break: break-word;
}

.error {
  color: hsl(0deg 56% 30%);
  border: 1px solid hsl(0deg 28% 62%);
  background-color: hsl(0deg 46% 70% / 78%);
}

.info {
  color: hsl(264deg 5% 20%);
  border: 1px solid hsl(0deg 0% 65%);
  background-color: hsl(0deg 0% 100%);
}

button {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>