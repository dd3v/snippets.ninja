<template>
  <teleport to="body">
    <transition-group name="list" tag="ul">
      <li v-for="(notification, key) in notifications" :key="key">
        <div class="notify-wrapper" :class="notification.type">
          {{ notification.message }}
          <button @click="deleteNotification(key)">&#x2715;</button>
        </div>
      </li>
    </transition-group>
  </teleport>
</template>
<script setup>
import { notifications, deleteNotification } from './api';

defineProps({
  message: {
    type: String,
  },
});
</script>

<style scoped>
ul {
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
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%),
    0 9px 28px 8px rgb(0 0 0 / 5%);
  border-radius: 11px;
  line-height: 20px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.error {
  color: hsl(0deg 56% 30%);
  border: 1px solid hsl(0deg 28% 62%);
  background-color: hsl(0deg 46% 70% / 78%);
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

.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>