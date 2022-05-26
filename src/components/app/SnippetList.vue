<template>
  <div class="snippet-list-wrapper" ref="scroll">
    <div class="snippet-list">
      <TransitionGroup
        tag="ul"
        :css="false"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
      >
        <li
          tabindex="0"
          v-for="snippet in items"
          :id="`snippet-${snippet.id}`"
          :key="snippet.id"
          :class="{ active: selected?.id === snippet.id }"
          @keydown.delete="$emit('snippets:delete', snippet)"
          @click="handleSelect(snippet)"
        >
          <snippet-item :snippet="snippet"/>
        </li>
      </TransitionGroup>
    </div>
  </div>
</template>
<script>
import { onMounted, onUnmounted, ref } from 'vue';
import gsap from 'gsap';
import SnippetItem from '@/components/app/SnippetItem.vue';

export default {
  name: 'SnippetList',
  emits: ['update:selected', 'snippets:more','snippets:delete'],
  components: { SnippetItem },
  props: {
    items: {
      type: Array,
    },
    selected: {},
  },
  setup(props, { emit }) {
    const scroll = ref(null);
    const handleSelect = (snippet) => {
      emit('update:selected', snippet);
    };
    // gsap animation stuff
    const onBeforeEnter = (el) => {
      // eslint-disable-next-line no-param-reassign
      el.style.opacity = 0;
      // eslint-disable-next-line no-param-reassign
      el.style.height = '70px';
    };
    const onEnter = (el, done) => {
      gsap.to(el, {
        opacity: 1,
        height: '70px',
        delay: el.dataset.index * 0.15,
        onComplete: done,
      });
    };
    const onLeave = (el, done) => {
      gsap.to(el, {
        opacity: 0,
        height: 0,
        delay: el.dataset.index * 0.15,
        onComplete: done,
      });
    };

    const handleScroll = () => {
      const el = scroll.value;
      console.log(el.offsetHeight);
      console.log(el.scrollTop);
      console.log(el.scrollHeight);

      if (el.offsetHeight + el.scrollTop >= el.scrollHeight) {
        console.warn('GO!');
        emit('snippets:more');
      }
    };

    onMounted(() => {
      scroll.value.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      // scroll.value.removeEventListener('scroll', handleScroll);
    });

    return { handleSelect, scroll, onBeforeEnter, onEnter, onLeave };
  },
};
</script>
<style scoped>
.snippet-list-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px 5px 5px 5px;
  overflow-y: scroll;
  scroll-behavior: smooth;
}

.snippet-list {
  margin: 10px 0;
}

.snippet-list li:hover {
  border-radius: 5px;
  background: var(--primary-bg-color);
  color: var(--primary-text-color);
}

.snippet-list li.active {
  border-radius: 5px;
  background: var(--primary-bg-color);
  color: var(--primary-text-color);
  box-shadow: var(--snippet-list-active-box-shadow);
}
</style>
