<template>
  <input
    :name="name"
    :type="type"
    v-model="inputValue"
    :placeholder="placeholder"
    :class="css"
    :aria-label="name"
  />
</template>
<script>
import { computed } from '@vue/reactivity';

export default {
  name: 'UInput',
  props: {
    modelValue: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    variant: {
      type: String,
      default: 'default',
    },
    placeholder: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const css = computed(() => {
      switch (props.variant) {
        case 'invisible':
          return 'invisible-input';
        case 'default':
          return 'default-input';
        default:
          return 'default-input';
      }
    });

    const inputValue = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    return { css, inputValue };
  },
};
</script>
<style scoped>
input[type='text'],
input[type='password'],
input[type='search'] {
  width: 100%;
  box-sizing: border-box;
}

.invisible-input {
  background: transparent;
  border: none;
  font-family: inherit;
}

.invisible-input:focus-visible {
  border: none;
  outline: none;
}

.default-input {
  align-items: center;
  overflow: hidden;
  height: 32px;
  border-radius: 10px;
  border: 1px solid hsl(260deg 3% 42% / 13%);
  transition: box-shadow 0.2s ease 0s;
  padding-left: 10px;
}
</style>