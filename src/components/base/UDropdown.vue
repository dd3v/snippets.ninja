<template>
  <div class="dropdown">
    <u-button ref="dropdownButton" @click="toggleDropdown" :circle="circle" class="dropdown-btn">
      <u-icon :name="icon" />
    </u-button>
    <transition name="slide">
      <div class="dropdown-content" v-if="isOpen" :class="{ 'drop-left': dropleft }">
        <slot />
      </div>
    </transition>
  </div>
</template>
<script setup>
import { ref } from 'vue';

defineProps({
  icon: {
    type: String,
    required: true,
  },
  dropleft: {
    type: Boolean,
  },
  circle: {
    type: Boolean,
  },
});

const isOpen = ref(false);
const dropdownButton = ref(null);

const closeListerner = (event) => {
  if (!event.target.parentNode.isSameNode(dropdownButton.value.$el)) {
    isOpen.value = false;
    window.removeEventListener('click', closeListerner);
  }
};

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
  window.addEventListener('click', closeListerner);
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
  box-shadow: var(--dropdown-content-box-shadow);
  background: var(--dropdown-content-background);
  border: var(--dropdown-content-border);
  padding: 5px;
  border-radius: 5px;
  overflow: hidden;
  margin: 2px;
}

.drop-left {
  right: 0%;
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