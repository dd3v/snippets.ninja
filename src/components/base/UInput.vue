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
import { computed } from 'vue';
import modelWrapper from '@/composable/modelWrapper';

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

    const inputValue = modelWrapper(props, emit);

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
  font-family: inherit;
}

.invisible-input {
  background: transparent;
  border: none;
  color: var(--default-input-text-color);
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
  border: var(--default-input-border);
  transition: box-shadow 0.2s ease 0s;
  padding-left: 10px;
  background: var(--default-input-background);
  color: var(--default-text-color);
}
</style>