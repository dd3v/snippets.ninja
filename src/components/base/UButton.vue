<template>
  <button :class="variant" :aria-label="ariaLabel" :disabled="disabled">
    <slot />
  </button>
</template>
<script setup>
defineProps({
  variant: {
    type: String,
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
button.default {
  border-radius: 5px;
  border: var(--btn-border);
  padding: 8px;
}
button.default:hover {
  border: var(--btn-hover-border);
}
button.circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  padding: 3px;
  border: var(--btn-border);
}

button.circle:hover {
  border: var(--btn-hover-border);
}
</style>