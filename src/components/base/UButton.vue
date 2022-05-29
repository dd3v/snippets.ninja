<template>
  <button class="btn" :class="{ 'btn-circle': circle }" :aria-label="ariaLabel">
    <slot />
  </button>
</template>
<script>
export default {
  name: 'UButton',
  props: {
    circle: {
      type: Boolean,
    },
    ariaLabel: {
      type: String,
    },
  },
  setup() {},
};
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
  width: 24px;
  height: 24px;
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