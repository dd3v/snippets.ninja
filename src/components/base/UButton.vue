<template>
  <button class="btn" :class="{ 'btn-circle': circle }" :aria-label="ariaLabel">
    <slot />
  </button>
</template>
<script setup>
defineProps({
  circle: {
    type: Boolean,
  },
  ariaLabel: {
    type: String,
  },
});
</script>
<style scoped>
.btn {
  border: none;
  background-color: inherit;
  cursor: pointer;
  display: inline-block;
  padding: 0;
  font-size: inherit;
  color: var(--btn-color);
}

.btn-circle {
  min-width: 24px;
  min-height: 24px;
  border-radius: 50%;
  border: var(--btn-circle-border);
}

.btn-circle:hover {
  border: var(--btn-circle-hover-border);
}

.btn:active {
  transform: scale(0.98);
  color: var(--btn-active-color);
}
</style>