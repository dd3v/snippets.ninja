<template>
  <teleport to="body">
    <transition name="slide">
      <div class="modal-backdrop" v-show="show" @click.self="close" @keydown.esc="close">
        <div class="modal">
          <header class="modal-header">
            <div class="modal-title">
              <slot name="header" />
            </div>
            <div class="modal-close">
              <button class="close-btn" @click="close">&#x2715;</button>
            </div>
          </header>
          <section class="modal-body">
            <slot name="body" />
          </section>
        </div>
      </div>
    </transition>
  </teleport>
</template>
<script setup>
import { ref } from 'vue';

const show = ref(false);

const onEsc = (event) => {
  if (show.value === true && event.keyCode === 27) {
    show.value = false;
  }
};

const close = () => {
  show.value = false;
  document.removeEventListener('keyup', onEsc);
};

const open = () => {
  show.value = true;
  document.addEventListener('keyup', onEsc);
};

defineExpose({
  open,
  close,
});
</script>
<style scoped>
.modal-backdrop {
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1000;
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
  border-radius: 5px;
  transition: all 0.3s ease;
  padding: 10px;
}

.modal-header {
  display: flex;
  font-size: 16px;
  justify-content: space-between;
  padding: 10px 0px 20px 0px;
  color: var(--modal-header-color);
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
</style>
