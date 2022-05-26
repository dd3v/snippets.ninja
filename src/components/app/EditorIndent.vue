<template>
  <div class="editor-indent-wrapper">
    Indent:
    <u-button @click="size--">
      <u-icon icon="minus" />
    </u-button>
    <span>{{ size }}</span>
    <u-button @click="size++">
      <u-icon icon="plus" />
    </u-button>
  </div>
</template>
<script>
import { computed } from 'vue';

export default {
  props: {
    modelValue: {
      type: Number,
    },
  },
  setup(props, { emit }) {
    const size = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    return { size };
  },
};
</script>

<style scoped>
.editor-indent-wrapper {

}
</style>