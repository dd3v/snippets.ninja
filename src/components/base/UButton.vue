<template>
  <button
    class="btn"
    :class="{ 'btn-circle': circle }"
    :aria-label="ariaLabel"
    :disabled="disabled"
  >
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
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>
<style scoped>
button {
  border: none;
  background-color: inherit;
  cursor: pointer;
  display: inline-block;
  padding: 0;
  font-size: inherit;
  color: var(--btn-color);
}
button:active {
  transform: scale(0.98);
  color: var(--btn-active-color);
}
button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
button.btn-circle {
  display: flex;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  padding: 3px;
  border: var(--btn-circle-border);
}

button.btn-circle:hover {
  border: var(--btn-circle-hover-border);
}
</style>