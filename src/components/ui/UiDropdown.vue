<template>
  <div class="dropdown">
    <button @click="this.isOpen = !this.isOpen" class="btn btn-circle">
      <ui-icon :icon="icon" />
    </button>
    <transition name="slide">
      <div class="dropdown-content" v-if="isOpen" :class="{ 'drop-left': dropleft }">
        <slot />
      </div>
    </transition>
  </div>
</template>
<script>
import { ref } from '@vue/reactivity';
import UiIcon from './UiIcon.vue';

export default {
  components: { UiIcon },
  name: 'UiDropdown',
  props: {
    icon: String,
    dropleft: Boolean,
  },
  setup() {
    const isOpen = ref(false);

    return { isOpen };
  },
};
</script>
<style scoped>
.dropdown {
  position: relative;
}

.dropdown-content {
  position: absolute;
  min-width: 160px;
  height: auto;
  z-index: 2;
  flex-direction: column;
  box-shadow: 0px 8px 25px rgba(43, 41, 46, 0.1);
  background: hsl(264, 7%, 100%);
  border: 1px solid hsla(264, 15%, 10%, 9%);
  padding: 5px;
  border-radius: 5px;
  overflow: hidden;
}

.drop-left {
  right: 100%;
  left: auto;
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
  transition: 0.5s all ease;
}

.slide-enter-to {
  opacity: 1;
  transform: translateY(0px);
  transition: 0.5s all ease;
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
  transition: 0.5s all ease;
}
</style>