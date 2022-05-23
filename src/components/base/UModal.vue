<template>
  <transition name="slide">
    <div class="modal-backdrop" v-show="show" @click.self="close" @keydown.self="close">
      <div class="modal">
        <header class="modal-header">
          <div>{{ header }}</div>
          <div><button class="close-btn" @click="close">&#x2715;</button></div>
        </header>
        <section class="modal-body">
          <slot />
        </section>
      </div>
    </div>
  </transition>
</template>
<script>
import { ref } from 'vue';

export default {
  name: 'UModal',
  props: {
    header: {
      type: String,
    },
  },
  setup() {
    const show = ref(false);

    const close = () => {
      show.value = false;
    };

    const closeEventListener = (e) => {
      if (e.keyCode === 27) {
        show.value = false;
        window.removeEventListener('keyup', closeEventListener);
      }
    };

    const open = () => {
      show.value = true;
      window.addEventListener('keyup', closeEventListener);
    };

    return { open, close, show };
  },
};
</script>
<style scoped>
.modal-backdrop {
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--modal-backdrop-background-color);
  transition: opacity 0.3s ease;
}

.modal {
  color: inherit;
  font-size: inherit;
  width: 400px;
  margin: 30px auto;
  padding: 5px 10px;
  box-shadow: var(--modal-box-shadow);
  background: var(--modal-background);
  border: var(--modal-border);
  border-radius: 5px;
  transition: all 0.3s ease;
}

.modal-body {
  padding: 15px 0px 15px 0px;
}

.modal-header {
  display: flex;
  font-size: 16px;
  justify-content: space-between;
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(0px);
  transition: 0.5s all ease;
}

.slide-enter-to {
  opacity: 1;
  transform: translateY(0px);
  transition: 0.5s all ease;
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(0px);
  transition: 0.5s all ease;
}

.close-btn {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}
</style>