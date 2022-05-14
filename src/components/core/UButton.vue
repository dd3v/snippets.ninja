<template>
  <button class="btn" :class="{ 'btn-circle': circle }">
    <slot />
  </button>
</template>
<script>
export default {
  name: 'UButton',
  props: {
    circle: Boolean,
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
}



.btn-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid #f0eaea;
}

.btn-circle:hover {
  border: 1px solid #b3afaf;
}

.btn:active {
  transform: scale(0.98);
  color: #000;
}
</style>