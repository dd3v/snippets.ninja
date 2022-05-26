import { computed } from 'vue';

export default function modelWrapper(props, emit) {
  return computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
  });
}
