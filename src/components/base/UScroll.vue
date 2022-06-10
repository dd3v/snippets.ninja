<template>
  <div class="scroll-wrapper" ref="scroll">
    <slot />
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  limit: {
    type: Number,
    default: 100,
  },
});

const emit = defineEmits(['scroll:end']);

const scroll = ref(null);
const skip = ref(0);

const onScroll = () => {
  const el = scroll.value;
  if (el.offsetHeight + el.scrollTop >= el.scrollHeight) {
    skip.value += Number(props.limit);
    emit('scroll:end', skip.value);
  }
};

const scrollUp = () => {
  scroll.value.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

onMounted(() => {
  scroll.value.addEventListener('scroll', onScroll);
});

defineExpose({ scroll, scrollUp });
</script>
<style scoped>
.scroll-wrapper {
  height: 100%;
  overflow-y: scroll;
  scroll-behavior: smooth;
}
</style>