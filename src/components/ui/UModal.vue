<template>
  <transition name="slide">
    <div class="modal-backdrop" v-show="show" @click.self="close" @keydown.self="close">
      <div class="modal">
        <header class="modal-header">
          <div>Modal header</div>
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
import { onMounted, ref } from 'vue';

export default {
  name: 'UModal',
  setup() {
    const show = ref(false);
    const backdrop = ref(null);

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

    onMounted(() => {});

    return { open, close, show, backdrop };
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
  background-color: rgba(0, 0, 0, 0.5);

  transition: opacity 0.3s ease;
}

.modal {
  color: inherit;
  font-size: inherit;
  width: 300px;
  margin: 10px auto;
  padding: 5px 10px;
  box-shadow: 0px 8px 25px rgb(43 41 46 / 10%);
  background: hsl(264, 7%, 100%);
  border: 1px solid hsla(264, 15%, 10%, 9%);
  border-radius: 5px;
  transition: all 0.3s ease;
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